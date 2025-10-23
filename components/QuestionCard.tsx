import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface QuestionCardProps {
  question: any;
  selectedOption?: string;
  onSelectOption: (option: string) => void;
  showAnswer?: boolean;
  correctAnswer?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  selectedOption, 
  onSelectOption, 
  showAnswer = false, 
  correctAnswer 
}) => {
  const { colors } = useTheme();
  
  const getOptionStyle = (optionLetter: string) => {
    if (showAnswer && optionLetter === correctAnswer) {
      return { backgroundColor: '#16a34a20', borderColor: '#16a34a' };
    }
    if (showAnswer && optionLetter === selectedOption && optionLetter !== correctAnswer) {
      return { backgroundColor: '#dc262620', borderColor: '#dc2626' };
    }
    if (optionLetter === selectedOption) {
      return { backgroundColor: colors.primary + '20', borderColor: colors.primary };
    }
    return { backgroundColor: colors.surface, borderColor: colors.border };
  };
  
  const getOptionTextColor = (optionLetter: string) => {
    if (showAnswer && optionLetter === correctAnswer) {
      return '#16a34a';
    }
    if (showAnswer && optionLetter === selectedOption && optionLetter !== correctAnswer) {
      return '#dc2626';
    }
    return colors.primary;
  };
  
  const optionLetters = ['A', 'B', 'C', 'D'];
  
  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <Text style={[styles.questionText, { color: colors.text }]}>{question.question}</Text>
      <View style={styles.optionsContainer}>
        {question.options.map((option: string, index: number) => {
          const letter = optionLetters[index];
          return (
            <TouchableOpacity
              key={index}
              style={[styles.option, getOptionStyle(letter)]}
              onPress={() => onSelectOption(letter)}
            >
              <Text style={[styles.optionLetter, { color: getOptionTextColor(letter) }]}>{letter})</Text>
              <Text style={[styles.optionText, { color: colors.text }]}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 24,
    lineHeight: 24,
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderRadius: 8,
  },
  optionLetter: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 12,
    minWidth: 24,
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
});

export default QuestionCard;