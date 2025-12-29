import { useAuthStore } from '@/app/core/store/authStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MenuModalProps {
  showMenu: boolean
  setShowMenu: (value: React.SetStateAction<boolean>) => void
  categories: ({
      label: string;
      value: undefined;
      icon: string;
  } | {
      label: string;
      value: string;
      icon: string;
  })[]
  setCategory: (category?: string) => void
}

const MenuModal = ({categories,setCategory,setShowMenu,showMenu}:MenuModalProps) => {
  const router = useRouter();

  const { signOut } = useAuthStore();

  const handleLogout = () => {
    signOut();
    router.replace('/(auth)/login');
  };

  const handleGoToProfile = () => {
    setShowMenu(false);
    router.push('/(tabs)/profile');
  };
  
  return (
  <Modal
    visible={showMenu}
    animationType="slide"
    transparent={true}
    onRequestClose={() => setShowMenu(false)}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.menuModalContent}>
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>Menu</Text>
          <TouchableOpacity onPress={() => setShowMenu(false)}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Navigation</Text>
          <TouchableOpacity style={styles.menuItem} onPress={() => {
            setShowMenu(false);
          }}>
            <Ionicons name="home-outline" size={24} color="#000" />
            <Text style={styles.menuItemText}>HOME</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}
          onPress={() => {
            setShowMenu(false);
            router.push('/(chat)/chat-screen');
          }}>
            <Ionicons name="chatbubble-ellipses-outline" size={22} color="#000" />
            <Text style={styles.menuItemText}>CHAT</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Categories</Text>
          {categories.slice(1).map((cat) => (
            <TouchableOpacity 
              key={cat.value} 
              style={styles.menuItem}
              onPress={() => {
                setShowMenu(false);
              
                setTimeout(() => {
                  setCategory(cat.value);
                }, 0);
              }}
              
            >
              <Text style={styles.menuCategoryText}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Account</Text>
          <TouchableOpacity style={styles.menuItem} onPress={handleGoToProfile}>
            <Ionicons name="person-outline" size={24} color="#000" />
            <Text style={styles.menuItemText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#000" />
            <Text style={styles.menuItemText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuFooter}>
          <Text style={styles.menuFooterText}>Refined. Minimal. Never boring.</Text>
        </View>
      </View>
    </View>
  </Modal>
)
};
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  menuModalContent: {
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    height: '100%',
    paddingTop: 50,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  menuTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
  },
  closeText: {
    fontSize: 16,
    color: '#666',
  },
  menuSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  menuSectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#999',
    marginBottom: 16,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  menuCategoryText: {
    fontSize: 16,
    color: '#000',
  },
  menuFooter: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
  },
  menuFooterText: {
    fontSize: 13,
    color: '#999',
    fontStyle: 'italic',
  }
})

export default MenuModal;