import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Question } from '../types/simulado';

interface QuestionCardProps {
  question: Question;
  selectedOption?: string;
  onSelectOption: (option: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, selectedOption, onSelectOption }) => {
  
  const getOptionStyle = (option: string) => {
    if (option === selectedOption) {
      return "bg-sky-200 border-sky-500";
    }
    return "bg-white border-slate-300";
  };
  
  return (
    <View className="bg-white p-6 rounded-2xl shadow-md mb-4">
      <Text className="text-lg font-semibold text-slate-800 mb-6">{question.question}</Text>
      <View className="space-y-3">
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            className={`w-full p-4 border-2 rounded-lg ${getOptionStyle(option)}`}
            onPress={() => onSelectOption(option)}
          >
            <Text className="text-base text-slate-700">{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default QuestionCard;