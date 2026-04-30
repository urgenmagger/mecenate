import { FC, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { colors, spacing, radii, textStyles } from '../../../common/theme';
import SendIcon from '../../../assets/icons/send.svg';

interface CommentInputProps {
  onSubmit: (text: string) => Promise<void>;
  isLoading: boolean;
}

export const CommentInput: FC<CommentInputProps> = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState('');
  const isDisabled = !text.trim() || isLoading;

  const handleSubmit = async () => {
    if (isDisabled) return;
    const trimmed = text.trim();
    await onSubmit(trimmed);
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ваш комментарий"
        placeholderTextColor={colors.text.placeholder}
        value={text}
        onChangeText={setText}
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
        textAlignVertical="center"
      />
      <Pressable
        style={styles.sendButton}
        onPress={handleSubmit}
        disabled={isDisabled}
      >
        <SendIcon
          width={20}
          height={19}
          color={isDisabled ? colors.brand.primaryDisabled : colors.brand.primary}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[6],
    paddingHorizontal: spacing[16],
    paddingVertical: spacing[12],
    backgroundColor: colors.background.surface,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: colors.neutral.white,
    borderWidth: 2,
    borderColor: colors.background.surfaceSoft,
    borderRadius: radii.lg,
    paddingTop: 10,
    paddingRight: spacing[16],
    paddingBottom: 10,
    paddingLeft: spacing[16],
    ...textStyles.postBody,
    color: colors.text.onLight,
    includeFontPadding: false,
  },
  sendButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
