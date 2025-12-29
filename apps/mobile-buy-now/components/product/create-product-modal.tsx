import { CreateProductDtoType } from '@/app/core/domain/dto/create-product.dto';
import { ProductProps } from '@/app/core/domain/entities/product';
import { ProductCategories } from '@/app/core/domain/types/product-category.type';
import { ProductStatus } from '@/app/core/domain/types/product-status.type';
import { useRegisterProductForm } from '@/app/core/hooks/forms/useRegisterProductForm';
import { useCreatePhoto } from '@/app/core/hooks/photo/useCreatePhoto';
import { useCreateProducts } from '@/app/core/hooks/products/useCreateProducts';
import { useProductWebSocket } from '@/app/core/hooks/socketio/useProductWebSocket';
import { generateProductDescription } from '@/app/core/infra/http/chat/openai-generate-product-description';
import { useAuthStore } from '@/app/core/store/authStore';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Select from '../select';

interface Props {
  visible: boolean;
  onClose: () => void;
  onCreated: (product: ProductProps) => void;
}

export const CATEGORY_LABELS: Record<ProductCategories, string> = {
  Featured: 'Destaque',
  Chairs: 'Cadeiras',
  Armchairs: 'Poltronas',
  TableLamp: 'Abajures',
  CeilingLight: 'Luminárias de Teto',
  Decors: 'Decoração',
  Rugs: 'Tapetes',
  Cushions: 'Almofadas',
};

const CATEGORIES: ProductCategories[] = [
  'Featured',
  'Chairs',
  'Armchairs',
  'TableLamp',
  'CeilingLight',
  'Decors',
  'Rugs',
  'Cushions',
];

const STATUS_LABELS: Record<ProductStatus, string> = {
  ACTIVE: 'ATIVO',
  INACTIVE: 'INATIVO',
  ARCHIVED: 'ARQUIVADO',
}
const STATUS: ProductStatus[] = ['ACTIVE', 'INACTIVE', 'ARCHIVED'];

export function CreateProductModal({ visible, onClose, onCreated }: Props) {
  const { userId } = useAuthStore();
  const { mutate } = useCreateProducts();
  const { mutateAsync } = useCreatePhoto();

  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [loadingDescription, setLoadingDescription] = useState(false);
  const [progress, setProgress] = useState(0);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useRegisterProductForm({
    userId: String(userId),
  });

  const handleProductCreated = useCallback((product: ProductProps) => {
    setCreating(false);
    setProgress(0);
    onCreated(product);
  }, []);

  useProductWebSocket(String(userId), {
    onJobProgress: ({ progress }) => {
      setCreating(true);
      setProgress(progress);
    },
    onProductCreated: handleProductCreated,
    onError: () => {
      setCreating(false);
      setProgress(0);
    },
  }); 

  const handleGenerateDescription = async () => {
    setLoadingDescription(true);
    const name = watch('name');
    const category = watch('category');

    if (!name || !category) return;

    const description = await generateProductDescription({
      name,
      category,
    });

    setValue('description', description);
    setLoadingDescription(false);
  }

  const onSubmit = async (data: CreateProductDtoType) => {
    try {
      setCreating(true);
      let paramsPhotoUrl = null;

      if (photoUri) {
        paramsPhotoUrl = await mutateAsync(photoUri);
      }

      mutate({
        ...data,
        photo: paramsPhotoUrl,
      });

      reset();
    } catch (err) {
      console.log(err);
      setCreating(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.card}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Criar Produto</Text>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value }}) => (
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Nome"
                value={value}
                placeholderTextColor="#777"
                style={styles.input}
                returnKeyType='next'
              />
            )}
          />
          {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

          <Controller
            control={control}
            name="productCode"
            render={({ field: { onChange, onBlur, value }}) => (
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Código"
                placeholderTextColor="#777"
                style={styles.input}
                returnKeyType='next'
              />
            )}
          />

          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, onBlur, value }}) => (
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Preço"
                keyboardType="numeric"
                placeholderTextColor="#777"
                style={styles.input}
                returnKeyType='next'
              />
            )}
          />

          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select
                label="Categoria"
                value={field.value}
                options={CATEGORIES}
                onChange={field.onChange}
                labelOptions={CATEGORY_LABELS}
              />
            )}
          />

          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select
                label="Status"
                value={field.value}
                options={STATUS}
                onChange={field.onChange}
                labelOptions={STATUS_LABELS}
              />
            )}
          />

          <TouchableOpacity
            onPress={handleGenerateDescription}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            {loadingDescription ?
              <ActivityIndicator color="#22c55e" /> : (
              <Ionicons name="sparkles-outline" size={18} color="#22c55e" />
              )}
            <Text style={{ color: '#22c55e', marginLeft: 8 }}>
             {loadingDescription ? 'Gerando descrição automatico' : 'Gerar descrição com IA'}
            </Text>
          </TouchableOpacity>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <TextInput
                {...field}
                multiline
                numberOfLines={4}
                placeholder="Descrição do produto"
                placeholderTextColor="#777"
                style={[
                  styles.input,
                  { height: 100, textAlignVertical: 'top' },
                ]}
              />
            )}
          />

          <TouchableOpacity
            onPress={async () => {
              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.8,
              });

              if (!result.canceled) {
                setPhotoUri(result.assets[0].uri);
              }
            }}
            style={styles.imagePicker}
            >
              {photoUri ? (
                <>
                <Image source={{ uri: photoUri }} style={styles.imagePreview} />
                <TouchableOpacity
                  onPress={() => setPhotoUri(null)}
                  style={styles.removeImage}
                >
                  <Ionicons name="close-circle" size={22} color="#ef4444" />
                </TouchableOpacity>

                </>
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="image-outline" size={32} color="#9ca3af" />
                  <Text style={styles.imageText}>Selecionar imagem</Text>
                </View>
              )}
          </TouchableOpacity>

          {creating && (
            <View style={{ alignItems: 'center', marginBottom: 8 }}>
              <ActivityIndicator color="#22c55e" />
              <Text style={styles.progress}>Progresso: {progress}%</Text>
            </View>
          )}

          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => {
                reset();
                onClose();
              }}
              style={[styles.button, styles.cancel]}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              style={styles.button}
            >
              <Text style={styles.buttonText}>
                {isSubmitting ? 'Salvando...' : 'Salvar'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
  },

  card: {
    backgroundColor: '#111',
    margin: 20,
    borderRadius: 16,
    padding: 20,
  },

  title: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 16,
    fontWeight: '600',
  },

  error: {
    color: '#d22525',
    fontSize: 18,
    marginBottom: 16,
    fontWeight: '600',
  },

  input: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },

  removeImage: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#000000aa',
    borderRadius: 20,
  },  

  imagePicker: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#333',
    borderRadius: 12,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },

  imagePlaceholder: {
    alignItems: 'center',
  },

  imageText: {
    color: '#9ca3af',
    marginTop: 8,
  },

  imagePreview: {
    width: '100%',
    height: '100%',
  },

  select: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },

  selectLabel: {
    color: '#9ca3af',
    fontSize: 12,
  },

  selectValue: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },

  selectOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    padding: 24,
  },

  selectCard: {
    backgroundColor: '#111',
    borderRadius: 12,
  },

  selectOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },

  selectOptionText: {
    color: '#fff',
    fontSize: 14,
  },

  actions: {
    flexDirection: 'row',
    marginTop: 12,
  },

  button: {
    backgroundColor: '#22c55e',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },

  cancel: {
    backgroundColor: '#333',
    marginRight: 8,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  progress: {
    color: '#22c55e',
    marginTop: 8,
    textAlign: 'center',
  },
});
