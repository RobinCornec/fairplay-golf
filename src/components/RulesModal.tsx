import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Modal, Portal, Button, Text, Divider, IconButton } from 'react-native-paper';
import { i18n } from '../localization';
import { theme, spacing } from '../theme';

interface RulesModalProps {
  visible: boolean;
  onDismiss: () => void;
  gameType?: '6point';
}

const GAME_RULES: Record<string, string[]> = {
  '6point': [
    'rules6pointPlayers',
    'rules6pointTotalPoints',
    'rules6pointBestScore',
    'rules6pointTie',
    'rules6pointDistributions',
    'rules6pointWorstScore',
    'rules6pointEnd'
  ]
};

const RULE_ICONS: Record<string, string> = {
  'rules6pointPlayers': 'account-group',
  'rules6pointTotalPoints': 'numeric-6-circle-outline',
  'rules6pointBestScore': 'trophy-outline',
  'rules6pointTie': 'equal',
  'rules6pointDistributions': 'format-list-bulleted',
  'rules6pointWorstScore': 'trending-down',
  'rules6pointEnd': 'flag-checkered'
};

export function RulesModal({ visible, onDismiss, gameType = '6point' }: RulesModalProps) {
  const rules = GAME_RULES[gameType] || [];

  return (
    <Portal>
      <Modal 
        visible={visible} 
        onDismiss={onDismiss} 
        contentContainerStyle={localStyles.modalContainer}
      >
        <View style={localStyles.header}>
          <IconButton icon="information-outline" size={24} iconColor={theme.colors.primary} />
          <Text variant="headlineSmall" style={localStyles.modalTitle}>{i18n.t('gameRules')}</Text>
        </View>
        <Divider style={localStyles.divider} />
        
        <ScrollView style={localStyles.modalContent} showsVerticalScrollIndicator={false}>
          {rules.map((key) => (
            <View key={key} style={localStyles.ruleItem}>
              <IconButton 
                icon={RULE_ICONS[key] || 'dot-circle'} 
                size={20} 
                iconColor={theme.colors.primary} 
                style={localStyles.ruleIcon}
              />
              <Text variant="bodyMedium" style={localStyles.rulesText}>
                {i18n.t(key)}
              </Text>
            </View>
          ))}
        </ScrollView>

        <Button
          mode="contained" 
          onPress={onDismiss} 
          style={localStyles.closeButton}
          textColor="white"
        >
          {i18n.t('close')}
        </Button>
      </Modal>
    </Portal>
  );
}

const localStyles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: spacing.l,
    margin: spacing.l,
    borderRadius: 16,
    maxHeight: '90%',
    width: '90%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.s,
  },
  modalTitle: {
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginLeft: -spacing.s,
  },
  divider: {
    marginBottom: spacing.m,
    height: 1,
    backgroundColor: theme.colors.outlineVariant,
  },
  modalContent: {
    marginBottom: spacing.m,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.m,
    paddingRight: spacing.m,
  },
  ruleIcon: {
    margin: 0,
    marginTop: -2,
  },
  rulesText: {
    flex: 1,
    lineHeight: 22,
    color: theme.colors.onSurfaceVariant,
  },
  closeButton: {
    marginTop: spacing.s,
    borderRadius: 8,
  },
});
