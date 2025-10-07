import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { Colors, Spacing, Typography } from '../constants/theme';

const { width } = Dimensions.get('window');

interface Ticket {
  id: string;
  date: string;
  visitors: number;
  totalPrice: number;
  purchaseDate: string;
  qrCode: string;
  isUsed: boolean;
}

interface TicketsScreenProps {
  navigation: any;
}

const TicketsScreen: React.FC<TicketsScreenProps> = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('11 Octobre 2025');
  const [visitorCount, setVisitorCount] = useState(2);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);
  const [myTickets, setMyTickets] = useState<Ticket[]>([]);
  const [showMyTickets, setShowMyTickets] = useState(false);
  
  const pricePerPerson = 1000;

  // Générer des dates pour les 30 prochains jours
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      dates.push(`${day} ${month} ${year}`);
    }
    return dates;
  };

  const availableDates = generateDates();

  const incrementVisitors = () => {
    setVisitorCount(prev => prev + 1);
  };

  const decrementVisitors = () => {
    if (visitorCount > 1) {
      setVisitorCount(prev => prev - 1);
    }
  };

  const generateTicketId = () => {
    return 'TICKET-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handlePurchase = () => {
    const ticketId = generateTicketId();
    const newTicket: Ticket = {
      id: ticketId,
      date: selectedDate,
      visitors: visitorCount,
      totalPrice: totalPrice,
      purchaseDate: new Date().toLocaleDateString('fr-FR'),
      qrCode: ticketId,
      isUsed: false,
    };
    
    setMyTickets([...myTickets, newTicket]);
    setCurrentTicket(newTicket);
    setShowTicketModal(true);
  };

  const totalPrice = visitorCount * pricePerPerson;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={28} color={Colors.white} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Billetterie</Text>
        
        <View style={{ width: 44 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Banner Card */}
        <View style={styles.bannerCard}>
          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80',
            }}
            style={styles.bannerImage}
            imageStyle={styles.bannerImageStyle}
          >
            <View style={styles.bannerOverlay}>
              <Text style={styles.bannerTitle}>Découvrez nos</Text>
              <Text style={styles.bannerTitle}>propositions permanentes</Text>
              <Text style={styles.bannerTitle}>et temporaires</Text>
            </View>
          </ImageBackground>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Choisissez votre date</Text>
          <TouchableOpacity 
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>{selectedDate}</Text>
            <Ionicons name="calendar-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Visitor Count */}
        <View style={styles.section}>
          <View style={styles.visitorHeader}>
            <Text style={styles.sectionLabel}>Nombre de visiteurs</Text>
            <Text style={styles.priceLabel}>{totalPrice} Fcfa</Text>
          </View>
          
          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={decrementVisitors}
              activeOpacity={0.7}
            >
              <Ionicons name="remove" size={24} color={Colors.primary} />
            </TouchableOpacity>
            
            <Text style={styles.counterValue}>{visitorCount}</Text>
            
            <TouchableOpacity
              style={styles.counterButton}
              onPress={incrementVisitors}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Purchase Button */}
        <TouchableOpacity
          style={styles.purchaseButton}
          activeOpacity={0.8}
          onPress={handlePurchase}
        >
          <Text style={styles.purchaseButtonText}>Acheter maintenant</Text>
        </TouchableOpacity>

        {/* My Tickets Button */}
        {myTickets.length > 0 && (
          <TouchableOpacity
            style={styles.myTicketsButton}
            activeOpacity={0.8}
            onPress={() => setShowMyTickets(true)}
          >
            <Ionicons name="ticket" size={20} color={Colors.white} />
            <Text style={styles.myTicketsButtonText}>
              Mes billets ({myTickets.length})
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choisissez une date</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Ionicons name="close" size={28} color={Colors.text.primary} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.dateList}>
              {availableDates.map((date, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dateItem,
                    selectedDate === date && styles.dateItemSelected
                  ]}
                  onPress={() => {
                    setSelectedDate(date);
                    setShowDatePicker(false);
                  }}
                >
                  <Ionicons 
                    name="calendar" 
                    size={20} 
                    color={selectedDate === date ? Colors.primary : Colors.text.secondary} 
                  />
                  <Text style={[
                    styles.dateItemText,
                    selectedDate === date && styles.dateItemTextSelected
                  ]}>
                    {date}
                  </Text>
                  {selectedDate === date && (
                    <Ionicons name="checkmark-circle" size={24} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Ticket Modal */}
      <Modal
        visible={showTicketModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowTicketModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.ticketModal}>
            <TouchableOpacity
              style={styles.ticketCloseButton}
              onPress={() => setShowTicketModal(false)}
            >
              <Ionicons name="close-circle" size={32} color={Colors.white} />
            </TouchableOpacity>
            
            {currentTicket && (
              <>
                <View style={styles.ticketHeader}>
                  <Ionicons name="checkmark-circle" size={64} color="#4CAF50" />
                  <Text style={styles.ticketSuccessTitle}>Achat réussi !</Text>
                  <Text style={styles.ticketSuccessSubtitle}>
                    Votre billet a été généré
                  </Text>
                </View>

                <View style={styles.ticketCard}>
                  <View style={styles.ticketQRContainer}>
                    {/* Vrai code QR avec l'ID du ticket */}
                    <QRCode
                      value={currentTicket.id}
                      size={160}
                      color="#000000"
                      backgroundColor="#FFFFFF"
                    />
                  </View>
                  
                  <View style={styles.ticketDetails}>
                    <View style={styles.ticketDetailRow}>
                      <Text style={styles.ticketDetailLabel}>ID Billet:</Text>
                      <Text style={styles.ticketDetailValue}>{currentTicket.id}</Text>
                    </View>
                    
                    <View style={styles.ticketDetailRow}>
                      <Text style={styles.ticketDetailLabel}>Date de visite:</Text>
                      <Text style={styles.ticketDetailValue}>{currentTicket.date}</Text>
                    </View>
                    
                    <View style={styles.ticketDetailRow}>
                      <Text style={styles.ticketDetailLabel}>Visiteurs:</Text>
                      <Text style={styles.ticketDetailValue}>{currentTicket.visitors}</Text>
                    </View>
                    
                    <View style={styles.ticketDetailRow}>
                      <Text style={styles.ticketDetailLabel}>Total:</Text>
                      <Text style={styles.ticketDetailValue}>
                        {currentTicket.totalPrice} Fcfa
                      </Text>
                    </View>
                    
                    <View style={styles.ticketDetailRow}>
                      <Text style={styles.ticketDetailLabel}>Statut:</Text>
                      <View style={styles.statusBadge}>
                        <View style={[
                          styles.statusDot, 
                          currentTicket.isUsed ? styles.statusDotUsed : styles.statusDotValid
                        ]} />
                        <Text style={[
                          styles.ticketDetailValue,
                          currentTicket.isUsed ? styles.statusTextUsed : styles.statusTextValid
                        ]}>
                          {currentTicket.isUsed ? 'Utilisé' : 'Valide'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <Text style={styles.ticketInstruction}>
                  Présentez ce QR code à l'entrée du musée
                </Text>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* My Tickets Modal */}
      <Modal
        visible={showMyTickets}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowMyTickets(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Mes billets</Text>
              <TouchableOpacity onPress={() => setShowMyTickets(false)}>
                <Ionicons name="close" size={28} color={Colors.text.primary} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.ticketsList}>
              {myTickets.map((ticket, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.savedTicketCard}
                  onPress={() => {
                    setCurrentTicket(ticket);
                    setShowMyTickets(false);
                    setShowTicketModal(true);
                  }}
                >
                  <View style={styles.savedTicketIcon}>
                    <Ionicons name="ticket" size={32} color={Colors.primary} />
                  </View>
                  
                  <View style={styles.savedTicketInfo}>
                    <View style={styles.savedTicketHeader}>
                      <Text style={styles.savedTicketDate}>{ticket.date}</Text>
                      <View style={[
                        styles.savedTicketBadge,
                        ticket.isUsed ? styles.savedTicketBadgeUsed : styles.savedTicketBadgeValid
                      ]}>
                        <Text style={[
                          styles.savedTicketBadgeText,
                          { color: ticket.isUsed ? '#EF4444' : '#22C55E' }
                        ]}>
                          {ticket.isUsed ? 'Utilisé' : 'Valide'}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.savedTicketDetails}>
                      {ticket.visitors} visiteur(s) • {ticket.totalPrice} Fcfa
                    </Text>
                    <Text style={styles.savedTicketId}>ID: {ticket.id}</Text>
                  </View>
                  
                  <Ionicons name="chevron-forward" size={24} color={Colors.text.secondary} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    paddingTop: 50,
    paddingBottom: Spacing.md,
    backgroundColor: '#2D2D2D',
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.white,
    fontFamily: 'serif',
  },
  content: {
    flex: 1,
  },
  bannerCard: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
    borderRadius: 16,
    overflow: 'hidden',
    height: 180,
  },
  bannerImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  bannerImageStyle: {
    borderRadius: 16,
  },
  bannerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(139, 111, 71, 0.6)',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.white,
    fontFamily: 'serif',
    lineHeight: 30,
  },
  section: {
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  sectionLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: Spacing.md,
    fontWeight: '400',
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: 'rgba(200, 168, 130, 0.3)',
    borderRadius: 12,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md + 4,
  },
  dateText: {
    fontSize: 17,
    color: Colors.white,
    fontWeight: '500',
  },
  visitorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  priceLabel: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: 'bold',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  counterButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterValue: {
    fontSize: 32,
    color: Colors.white,
    fontWeight: 'bold',
    minWidth: 50,
    textAlign: 'center',
  },
  purchaseButton: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl * 2,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  purchaseButtonText: {
    fontSize: 18,
    color: '#2D2D2D',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  bottomSpace: {
    height: 40,
  },
  myTicketsButton: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    backgroundColor: 'rgba(200, 168, 130, 0.2)',
    borderRadius: 16,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  myTicketsButtonText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: Colors.background,
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surface,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text.primary,
    fontFamily: 'serif',
  },
  dateList: {
    maxHeight: 400,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md + 4,
    gap: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surface,
  },
  dateItemSelected: {
    backgroundColor: 'rgba(200, 168, 130, 0.1)',
  },
  dateItemText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
  },
  dateItemTextSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  ticketModal: {
    width: '90%',
    backgroundColor: '#2D2D2D',
    borderRadius: 20,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  ticketCloseButton: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    zIndex: 10,
  },
  ticketHeader: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  ticketSuccessTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: Spacing.md,
    fontFamily: 'serif',
  },
  ticketSuccessSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: Spacing.xs,
  },
  ticketCard: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  ticketQRContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 2,
    borderBottomColor: Colors.surface,
    borderStyle: 'dashed',
  },
  ticketDetails: {
    gap: Spacing.md,
  },
  ticketDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketDetailLabel: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  ticketDetailValue: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '700',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusDotValid: {
    backgroundColor: '#22C55E',
  },
  statusDotUsed: {
    backgroundColor: '#EF4444',
  },
  statusTextValid: {
    color: '#22C55E',
  },
  statusTextUsed: {
    color: '#EF4444',
  },
  ticketInstruction: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  ticketsList: {
    maxHeight: 500,
  },
  savedTicketCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surface,
  },
  savedTicketIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(200, 168, 130, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  savedTicketInfo: {
    flex: 1,
  },
  savedTicketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  savedTicketDate: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  savedTicketBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  savedTicketBadgeValid: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  savedTicketBadgeUsed: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  savedTicketBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#22C55E',
  },
  savedTicketDetails: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  savedTicketId: {
    fontSize: 12,
    color: Colors.text.tertiary,
  },
});

export default TicketsScreen;