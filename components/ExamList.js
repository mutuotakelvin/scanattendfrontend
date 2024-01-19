import React from "react";
import { View, Text, StatusBar, RefreshControl, FlatList } from "react-native";
import { FlashList } from "@shopify/flash-list";
 
import exams from "../constants/exams";
import ExamCard from "./ExamCard";


const ExamList = ({data, onRefresh}) => {

  renderItem = ({ item }) => <ExamCard 
    id={item.id} 
    name={item.exam_name} 
    date={item.exam_date} 
    time={item.exam_time} 
    duration={item.exam_duration} 
    code={item.exam_code} 
    qrcode={item.qr_code} 
    lec={item.exam_creator} 
    onRefresh={onRefresh}
  />
  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl 
            refreshing={false}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
}
export default ExamList