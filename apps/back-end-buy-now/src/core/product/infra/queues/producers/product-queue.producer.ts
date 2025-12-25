import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateProductJobData } from '../processors/product.processor';

@Injectable()
export class ProductQueueProducer {
  private readonly logger = new Logger(ProductQueueProducer.name);

  constructor(
    @InjectQueue('product-queue') private readonly productQueue: Queue,
  ) {}

  async addCreateProductJob(productData: CreateProductJobData['productData']) {
    const job = await this.productQueue.add('create-product', {
      productData,
    }, {
      attempts: 3, 
      backoff: {
        type: 'exponential', 
        delay: 5000, 
      },
      removeOnComplete: 100,
      removeOnFail: false, 
    });

    this.logger.log(`Job ${job.id} adicionado à fila para criar produto: ${productData.name}`);

    return {
      jobId: String(job.id),
      message: 'Produto será processado em breve',
    };
  }

  async getJobStatus(jobId: string) {
    try {
      const job = await this.productQueue.getJob(jobId);

      if (!job) {
        return { 
          status: 'not_found',
          message: 'Job não encontrado ou já foi removido da fila' 
        };
      }

      const state = await job.getState();
      const progress = job.progress();

      return {
        jobId: String(job.id),
        status: state, 
        progress,
        data: job.data,
        result: job.returnvalue,
        failedReason: job.failedReason,
        processedOn: job.processedOn,
        finishedOn: job.finishedOn,
      };
    } catch (error) {
      this.logger.error(`Erro ao buscar status do job ${jobId}:`, error);
      return {
        status: 'error',
        message: 'Erro ao buscar status do job',
      };
    }
  }

  async getAllJobs() {
    const [waiting, active, completed, failed, delayed] = await Promise.all([
      this.productQueue.getWaiting(),
      this.productQueue.getActive(),
      this.productQueue.getCompleted(),
      this.productQueue.getFailed(),
      this.productQueue.getDelayed(),
    ]);

    return {
      waiting: waiting.length,
      active: active.length,
      completed: completed.length,
      failed: failed.length,
      delayed: delayed.length,
      jobs: {
        waiting: waiting.map(j => ({ id: j.id, data: j.data })),
        active: active.map(j => ({ id: j.id, data: j.data })),
        completed: completed.slice(0, 10).map(j => ({ id: j.id, result: j.returnvalue })),
        failed: failed.slice(0, 10).map(j => ({ id: j.id, reason: j.failedReason })),
      }
    };
  }
}