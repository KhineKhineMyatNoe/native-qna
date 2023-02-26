import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { QuestionCreateProps } from "../apis/question";
import CustomTextInput from "../components/CustomTextInput";
import CustomTitleText from "../components/CustomTitleText";
import useCreateQuestion from "../hooks/useCreateQuestion";

interface CreateFormProps {}

const CreateForm: React.FC<CreateFormProps> = ({}) => {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [choices, setChoices] = useState<string>("");

  const [data, setData] = useState<QuestionCreateProps | null>(null);

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const { handleSubmit, isLoading } = useCreateQuestion(goBack);

  const createQuestionMethod = () => {
    const newData = {
      question: question,
      choices: JSON.parse(choices),
      answer: answer,
    };

    setData({ ...newData });

    handleSubmit({ ...newData });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, marginHorizontal: 20, marginTop: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>Create Question</Text>
      <View style={{ backgroundColor: "transparent", height: 20 }} />
      <CustomTitleText TextData="Question" />
      <View style={{ backgroundColor: "transparent", height: 10 }} />
      <CustomTextInput inputValue={question} onChangeTxt={setQuestion} />
      <View style={{ backgroundColor: "transparent", height: 10 }} />

      <CustomTitleText TextData="Choices" />
      <View style={{ backgroundColor: "transparent", height: 10 }} />
      <CustomTextInput inputValue={choices} onChangeTxt={setChoices} />

      <View style={{ backgroundColor: "transparent", height: 10 }} />

      <CustomTitleText TextData="Answer" />
      <View style={{ backgroundColor: "transparent", height: 10 }} />
      <CustomTextInput inputValue={answer} onChangeTxt={setAnswer} />
      <View style={{ backgroundColor: "transparent", height: 10 }} />
      <TouchableOpacity onPress={createQuestionMethod}>
        <View
          style={{
            backgroundColor: "blue",
            paddingVertical: 10,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Save
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{ backgroundColor: "transparent", height: 20 }} />

      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <View
          style={{
            backgroundColor: "grey",
            paddingVertical: 10,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Back
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CreateForm;
