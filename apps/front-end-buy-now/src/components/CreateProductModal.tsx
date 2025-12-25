'use client';

import { CreateProductDtoType } from '@/core/domain/dto/create-product.dto';
import { UpdateProductDtoType } from '@/core/domain/dto/update-product.dto';
import { useCreatePhoto } from '@/hooks/cloudinary/useCloudinary';
import { useRegisterProductForm } from '@/hooks/forms/useRegisterProductForm';
import { useCreateProducts } from '@/hooks/product/useCreateProducts';
import { useUpdateProduct } from '@/hooks/product/useUpdateProduct';
import { ImagePlus, Loader2 } from "lucide-react";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { GenerateDescriptionButton } from './GenerateDescriptionButton';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  productId?: string;
  initialData?: UpdateProductDtoType & { userId?: string };
}

const categories = [
  { label: 'Em destaque', value: 'Featured' },
  { label: 'Cadeiras', value: 'Chairs' },
  { label: 'Poltronas', value: 'Armchairs' },
  { label: 'Abajur', value: 'TableLamp' },
  { label: 'Luminária de teto', value: 'CeilingLight' },
  { label: 'Decorações', value: 'Decors' },
  { label: 'Tapetes', value: 'Rugs' },
  { label: 'Almofadas', value: 'Cushions' },
];

const statuses = [
  { label: 'Ativo', value: 'ACTIVE' },
  { label: 'Inativo', value: 'INACTIVE' },
  { label: 'Arquivado', value: 'ARCHIVED' },
];

export function ProductModal({ isOpen, onClose, mode, productId, initialData }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useRegisterProductForm();

  const createProduct = useCreateProducts(
    onClose, 
    () => {
    }
  );

  const updateProduct = useUpdateProduct(onClose);
  const { mutateAsync } = useCreatePhoto();

  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        const validFields = ['name', 'productCode', 'description', 'price', 'status', 'category', 'photo', 'userId'] as const;
        
        validFields.forEach((field) => {
          if (initialData[field] !== undefined) {
            setValue(field, initialData[field]);
          }
        });
        
        if (initialData.photo) {
          setPreview(initialData.photo);
        }
      } else {
        reset();
        setPreview(null);
      }
    }
  }, [isOpen, mode, initialData, setValue, reset]);

  if (!isOpen) return null;

  async function handleImageUpload(file: File) {
    try {
      setUploading(true);
      const imageUrl = await mutateAsync(file);
      setValue('photo', imageUrl);
      setPreview(imageUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  }

  const onSubmit = (data: CreateProductDtoType | UpdateProductDtoType) => {
    if (mode === 'create') {
      createProduct.mutate(data as CreateProductDtoType);
    } else if (mode === 'edit' && productId) {
      updateProduct.mutate({ productId, data: data as UpdateProductDtoType });
    }
  };

  const isSubmitting = createProduct.isPending || updateProduct.isPending;

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/60 backdrop-blur-sm
        transition-opacity duration-300
        ${isOpen ? 'opacity-100' : 'opacity-0'}
      `}
    >
      <div
        className={`
          w-full max-w-lg rounded-2xl bg-black p-6 space-y-6
          transform transition-all duration-300
          ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
      >
        <h2 className="text-xl font-semibold text-white">
          {mode === 'create' ? 'Criar Produto' : 'Editar Produto'}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register('name')}
              placeholder="Nome do produto"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            />
            {errors.name && (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>

          {mode === 'create' && (
            <div>
              <input
                {...register('productCode')}
                placeholder="Código do produto"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
              />
              {errors.productCode && (
                <span className="text-xs text-red-500">
                  {errors.productCode.message}
                </span>
              )}
            </div>
          )}

          <div>
            <input
              {...register('price')}
              placeholder="Preço"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            />
            {errors.price && (
              <span className="text-xs text-red-500">
                {errors.price.message}
              </span>
            )}
          </div>

          <div>
            <select
              {...register('category')}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              {...register('status')}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
            >
              {statuses.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
            {errors.status && (
              <span className="text-xs text-red-500">
                {errors.status.message}
              </span>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex flex-col items-center justify-center gap-4">
              <label 
                htmlFor="image-upload"
                className={`
                  relative group flex flex-col items-center justify-center w-full 
                  ${preview ? 'h-48' : 'h-32'} 
                  border-2 border-dashed rounded-xl cursor-pointer transition-all
                  ${preview ? 'border-zinc-700 bg-zinc-900/50' : 'border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-700'}
                `}
              >
                {preview ? (
                  <div className="relative w-full h-full p-2">
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-medium bg-zinc-900/80 px-3 py-2 rounded-full">
                        {mode === 'create' ? 'Alterar imagem' : 'Trocar imagem'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6">
                    {uploading ? (
                      <Loader2 className="h-8 w-8 text-zinc-500 animate-spin" />
                    ) : (
                      <>
                        <ImagePlus className="h-8 w-8 text-zinc-600 mb-2 group-hover:text-zinc-400 transition-colors" />
                        <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                          Clique para selecionar ou arraste
                        </p>
                        <p className="text-[10px] text-zinc-600 mt-1">PNG, JPG ou WEBP (Max. 5MB)</p>
                      </>
                    )}
                  </div>
                )}

                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                  className="hidden"
                  disabled={uploading}
                />
              </label>

              {uploading && (
                <div className="flex items-center gap-2 text-xs text-emerald-500 animate-pulse">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Sincronizando imagem...
                </div>
              )}
            </div>
            {errors.photo && (
              <span className="text-xs text-red-500">
                {errors.photo.message}
              </span>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-300">
                Descrição
              </label>

              <GenerateDescriptionButton
                name={watch('name')}
                category={watch('category')}
                onGenerated={(description) =>
                  setValue('description', description)
                }
              />
            </div>

            <textarea
              {...register('description')}
              rows={5}
              placeholder="Adicione uma descrição ou deixe a IA criar"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white focus:border-white transition"
            />

            {errors.description && (
              <span className="text-xs text-red-500">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-zinc-600 px-4 py-2 text-zinc-300 cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-white px-4 py-2 text-black disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? 'Salvando...' : mode === 'create' ? 'Criar' : 'Atualizar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}