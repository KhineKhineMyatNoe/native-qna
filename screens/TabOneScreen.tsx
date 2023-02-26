import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ListRenderItem,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useQuery } from "@tanstack/react-query";
import { questionApi, QuestionObj, ResultsObj } from "../apis/question";
import { useCallback, useEffect, useState } from "react";
import useCreateResult from "../hooks/useCreateResult";

interface ResultObj extends QuestionObj {
  user_answer: string | null;
}

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [result, setResult] = useState<any[]>([]);
  const questionQuery = useQuery({
    queryKey: ["questions"],
    queryFn: questionApi,
    retry: 1,
    refetchOnMount: false,
  });

  const ItemSelect = (id: string | number, value: string) => {
    var newResult = result.map((res) =>
      res.id == id ? { ...res, user_answer: value } : res
    );

    setResult([...newResult]);
  };

  const resetData = useCallback(() => {
    const resultData = result.map((item) => ({ ...item, user_answer: null }));
    console.log({ resultData });
    setResult([...resultData]);
  }, [result, setResult]);

  const { handleClick } = useCreateResult(resetData);

  useEffect(() => {
    if (questionQuery?.data?.length && questionQuery?.data?.length > 0) {
      setResult(
        questionQuery.data.map((item) => ({ ...item, user_answer: null }))
      );
    }
  }, [questionQuery.data]);

  const renderItem: ListRenderItem<ResultObj> | null | undefined = ({
    item,
    index,
  }) => {
    return (
      <View style={styles.questionContainer} key={index}>
        <Text style={styles.questionText}>{item.attributes.question}</Text>
        {Object.entries(item.attributes.choices).map((choice) => (
          <View style={styles.radioBtnContainer}>
            <TouchableOpacity
              style={[
                styles.radioBtn,
                {
                  backgroundColor:
                    choice[0] == item.user_answer ? "#86bdd9" : "#b3adad",
                },
              ]}
              onPress={() => ItemSelect(item.id, choice[0])}
            ></TouchableOpacity>
            <Text>{choice[1] as string}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.createContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CreateForm");
          }}
        >
          <View style={styles.createBtn}>
            <Text style={styles.createText}>Create</Text>
          </View>
        </TouchableOpacity>
      </View>

      {questionQuery.isLoading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
      {result && (
        <FlatList
          data={result}
          ItemSeparatorComponent={() => (
            <View style={{ height: 10, flex: 1 }} />
          )}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id.toString()}
        />
      )}

      <View style={[styles.createContainer, { alignItems: "flex-start" }]}>
        <TouchableOpacity
          onPress={() => {
            let data: ResultsObj = {
              user: 1,
              answer: result,
            };

            handleClick({ ...data });
          }}
        >
          <View style={styles.createBtn}>
            <Text style={styles.createText}>Submit the answer</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  createContainer: {
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  createBtn: {
    backgroundColor: "blue",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  createText: {
    color: "white",
    fontSize: 16,
  },
  questionContainer: {
    backgroundColor: "#d4cfcf50",
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 20,
  },
  questionText: {
    color: "black",
    fontSize: 14,
  },
  radioBtnContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    marginTop: 5,
  },
  radioBtn: {
    backgroundColor: "#86bdd9",
    // backgroundColor: "#b3adad",
    borderRadius: 5,
    width: 15,
    height: 15,
    marginRight: 5,
  },
  radioText: {},
});
