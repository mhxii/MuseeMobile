import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../constants/theme';

interface AccordionItemProps {
  title: string;
  content: string;
  isExpanded: boolean;
  onPress: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isExpanded, onPress }) => (
  <TouchableOpacity style={styles.accordionItem} onPress={onPress}>
    <View style={styles.accordionHeader}>
      <Text style={styles.accordionTitle}>{title}</Text>
      <Ionicons 
        name={isExpanded ? "chevron-up" : "chevron-down"} 
        size={24} 
        color="rgba(255, 255, 255, 0.5)" 
      />
    </View>
    {isExpanded && (
      <View style={styles.accordionContent}>
        <Text style={styles.accordionText}>{content}</Text>
      </View>
    )}
  </TouchableOpacity>
);

export const AboutScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact'>('faq');
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

  const toggleAccordion = (key: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const faqData = [
    {
      key: 'hours',
      title: 'Horaires d\'ouverture',
      content: 'Le musée est ouvert du mardi au dimanche de 10h à 18h. Fermé les lundis et jours fériés.',
    },
    {
      key: 'tickets',
      title: 'Tarifs et billets',
      content: 'Adultes: 1000 Fcfa | Étudiants: 500 Fcfa | Enfants (-12 ans): Gratuit. Billets disponibles en ligne ou sur place.',
    },
    {
      key: 'accessibility',
      title: 'Accessibilité',
      content: 'Le musée est entièrement accessible aux personnes à mobilité réduite. Des fauteuils roulants sont disponibles gratuitement.',
    },
    {
      key: 'guided',
      title: 'Visites guidées',
      content: 'Des visites guidées sont organisées tous les samedis à 14h. Réservation recommandée via notre site web.',
    },
  ];

  const contactItems = [
    {
      key: 'customer',
      title: 'Customer Service',
      content: '',
    },
    {
      key: 'whatsapp',
      title: 'WhatsApp',
      content: '+221 78 662 28 54',
      action: () => Linking.openURL('https://wa.me/221786622854'),
    },
    {
      key: 'website',
      title: 'Website',
      content: 'www.mcn.sn',
      action: () => Linking.openURL('https://www.mcn.sn'),
    },
    {
      key: 'facebook',
      title: 'Facebook',
      content: '@MuseeDesCivilisationsNoires',
      action: () => Linking.openURL('https://facebook.com/MuseeDesCivilisationsNoires'),
    },
    {
      key: 'twitter',
      title: 'Twitter',
      content: '@MCN_Senegal',
      action: () => Linking.openURL('https://twitter.com/MCN_Senegal'),
    },
    {
      key: 'instagram',
      title: 'Instagram',
      content: '@mcn_senegal',
      action: () => Linking.openURL('https://instagram.com/mcn_senegal'),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>À propos</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'faq' && styles.activeTab]}
          onPress={() => setActiveTab('faq')}
        >
          <Text style={[styles.tabText, activeTab === 'faq' && styles.activeTabText]}>
            FAQ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'contact' && styles.activeTab]}
          onPress={() => setActiveTab('contact')}
        >
          <Text style={[styles.tabText, activeTab === 'contact' && styles.activeTabText]}>
            Contact Us
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab indicator */}
      <View style={styles.tabIndicatorContainer}>
        <View style={[
          styles.tabIndicator,
          { transform: [{ translateX: activeTab === 'faq' ? 0 : 196 }] }
        ]} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {activeTab === 'faq' ? (
          <View style={styles.faqContainer}>
            {faqData.map((item) => (
              <AccordionItem
                key={item.key}
                title={item.title}
                content={item.content}
                isExpanded={expandedItems[item.key] || false}
                onPress={() => toggleAccordion(item.key)}
              />
            ))}
          </View>
        ) : (
          <View style={styles.contactContainer}>
            {contactItems.map((item) => (
              <TouchableOpacity
                key={item.key}
                style={styles.accordionItem}
                onPress={() => {
                  if (item.action) {
                    toggleAccordion(item.key);
                  } else {
                    toggleAccordion(item.key);
                  }
                }}
              >
                <View style={styles.accordionHeader}>
                  <Text style={styles.accordionTitle}>{item.title}</Text>
                  <Ionicons 
                    name={expandedItems[item.key] ? "chevron-up" : "chevron-down"} 
                    size={24} 
                    color="rgba(255, 255, 255, 0.5)" 
                  />
                </View>
                {expandedItems[item.key] && item.content && (
                  <TouchableOpacity 
                    style={styles.accordionContent}
                    onPress={item.action}
                  >
                    <View style={styles.contactRow}>
                      <View style={styles.contactDot} />
                      <Text style={styles.contactText}>{item.content}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2D2D',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl + 10,
    paddingBottom: Spacing.lg,
    backgroundColor: '#2D2D2D',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: Colors.white,
    fontFamily: 'serif',
  },
  placeholder: {
    width: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  activeTab: {
    // Active state handled by text color
  },
  tabText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '500',
  },
  activeTabText: {
    color: Colors.white,
    fontWeight: '600',
  },
  tabIndicatorContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xs,
  },
  tabIndicator: {
    width: 180,
    height: 3,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    marginTop: Spacing.lg,
  },
  faqContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  contactContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  accordionItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  accordionTitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '500',
  },
  accordionContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    paddingTop: 0,
  },
  accordionText: {
    fontSize: 14,
    color: Colors.white,
    lineHeight: 22,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  contactDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.white,
  },
  contactText: {
    fontSize: 14,
    color: Colors.white,
    flex: 1,
  },
});
