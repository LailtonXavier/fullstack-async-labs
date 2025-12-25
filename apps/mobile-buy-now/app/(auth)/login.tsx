import { Link, useRouter } from 'expo-router';
import { useRef } from 'react';
import { Controller } from 'react-hook-form';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLogin } from '../core/hooks/auth/useLogin';
import { useLoginForm } from '../core/hooks/forms/useLoginForm';
import { useToast } from '../core/hooks/toast/useToast';

export default function LoginScreen() {
  const login = useLogin();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useLoginForm();
  const { showSuccess, showError } = useToast();
  const router = useRouter();
  const passwordRef = useRef<TextInput>(null);

  const onSubmit = async (data: any) => {
    try {
      await login.mutateAsync(data);
      showSuccess('Login realizado!', 'Bem-vindo de volta!');
      router.replace('/(tabs)/products');
    } catch {
      showError('Login invalido!');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ImageBackground
        source={require('../../assets/images/chair.webp')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.logo}>BUY.NOW</Text>
            <Text style={styles.subtitle}>
              Faça login para continuar
            </Text>
          </View>

          <View style={styles.card}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Email"
                    style={[
                      styles.input,
                      errors.email && styles.inputError,
                    ]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholderTextColor="#999"
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    blurOnSubmit={false}
                  />
                  {errors.email && (
                    <Text style={styles.errorText}>
                      {errors.email.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    ref={passwordRef}
                    placeholder="Senha"
                    style={[
                      styles.input,
                      errors.password && styles.inputError,
                    ]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry
                    placeholderTextColor="#999"
                    returnKeyType="go"
                    onSubmitEditing={handleSubmit(onSubmit)}
                  />
                  {errors.password && (
                    <Text style={styles.errorText}>
                      {errors.password.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <TouchableOpacity
              style={[
                styles.button,
                (!isValid || login.isPending) && styles.buttonDisabled,
              ]}
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || login.isPending}
            >
              <Text style={styles.buttonText}>
                {login.isPending ? 'Entrando...' : 'Entrar'}
              </Text>
            </TouchableOpacity>

            <Link href="/(auth)/register" asChild>
              <TouchableOpacity>
                <Text style={styles.registerText}>
                  Não tem conta? <Text style={styles.registerBold}>Criar agora</Text>
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  header: {
    marginVertical: 30,
    marginBottom: 80,
  },
  logo: {
    fontSize: 34,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1.5,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: '#ccc',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#000',
  },
  inputError: {
    borderColor: '#000',
  },
  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: '#555',
  },
  button: {
    marginTop: 12,
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
  },
  registerBold: {
    color: '#000',
    fontWeight: '700',
  },
});
