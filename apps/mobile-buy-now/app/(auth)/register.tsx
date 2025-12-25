import { useRegister } from '@/app/core/hooks/auth/useRegister';
import { useRegisterForm } from '@/app/core/hooks/forms/useRegisterForm';
import { useToast } from '@/app/core/hooks/toast/useToast';
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

export default function RegisterScreen() {
  const register = useRegister();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useRegisterForm();
  const { showSuccess } = useToast();
  const router = useRouter();
  const passwordRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);

  const onSubmit = async (data: any) => {
    try {
      await register.mutateAsync(data);
      showSuccess('Cadastro realizado!', 'Faça login agora mesmo!');
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ImageBackground
        source={require('../../assets/images/chair2.webp')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.logo}>BUY.NOW</Text>
            <Text style={styles.subtitle}>
              Crie sua conta para continuar
            </Text>
          </View>

          <View style={styles.card}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Nome completo"
                    style={[
                      styles.input,
                      errors.name && styles.inputError,
                    ]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor="#999"
                    returnKeyType="next"
                    onSubmitEditing={() => emailRef.current?.focus()}
                    blurOnSubmit={false}
                  />
                  {errors.name && (
                    <Text style={styles.errorText}>
                      {errors.name.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    ref={emailRef}
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
                (!isValid || register.isPending) && styles.buttonDisabled,
              ]}
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || register.isPending}
            >
              <Text style={styles.buttonText}>
                {register.isPending ? 'Criando conta...' : 'Criar conta'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.termsText}>
              Ao continuar, você concorda com nossos Termos e Política de Privacidade
            </Text>

            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text style={styles.loginText}>
                  Já tem conta? <Text style={styles.loginBold}>Entrar</Text>
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
  container: { flex: 1 },
  background: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
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
  inputContainer: { marginBottom: 16 },
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
  buttonDisabled: { opacity: 0.5 },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  termsText: {
    marginTop: 14,
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
  },
  loginText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
  },
  loginBold: {
    color: '#000',
    fontWeight: '700',
  },
});
