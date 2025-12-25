import { Either, right } from '@/shared/core/validation';
import { Injectable } from '@nestjs/common';
import { ProductQueueProducer } from '../infra/queues/producers/product-queue.producer';

type GetJobStatusResponse = Either<never, any>;

@Injectable()
export class GetProductJobStatusUseCase {
  constructor(private readonly productQueueProducer: ProductQueueProducer) {}

  async execute(jobId: string): Promise<GetJobStatusResponse> {
    const status = await this.productQueueProducer.getJobStatus(jobId);
    return right(status);
  }
}