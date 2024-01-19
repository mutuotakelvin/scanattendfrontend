import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity,  } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import useUserStore from '../../../store/UserStore';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const Attendance = () => {
    const { id } = useLocalSearchParams();
    const [attendeesData, setAttendeesData] = useState([]);
    const router = useRouter()
    const { setStudentDetail } = useUserStore();

    const fetchAttendees = async () => {
        try {
            const res = await fetch(`http://10.0.2.2:8000/api/exam/${id}`);
            if (res.ok) {
                const data = await res.json();
                console.log('Students attended', data.exam_attendance);
                setAttendeesData(data.exam_attendance);
            } else {
                Alert.alert('Error', 'No attendees found');
            }
        } catch (error) {
            console.error('Error fetching attendees', error);
            Alert.alert('Error', 'Failed to fetch attendees');
        }
        getStudents();
    };

    const getStudents = async () => {
        try {
            const res = await fetch('http://10.0.2.2:8000/api/student/')
            if (res.ok) {
                const data = await res.json();
                console.log('Students', data.results);
                setStudentDetail(data.results);
            }
        } catch (error) {
            console.error('Error fetching students', error);
        }
    };

    const handleGoToStudent = (id) => {
        getStudents().then(() => {
            router.push(`/attend/student/${id}`);
        })
    }

    useEffect(() => {
        fetchAttendees();
    }, [id]);

    const renderAttendeeItem = ({ item }) => {
        const attendedAt = new Date(item.attended_at);
        const formattedDate = attendedAt.toLocaleDateString();
        const formattedTime = attendedAt.toLocaleTimeString();
    
        return (
            <TouchableOpacity onPress={() => handleGoToStudent(item.student.id)}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1 }}>
                    <Text className='text-white'>{item.student.username}</Text>
                    <Text className='text-white'>{`${formattedDate} ${formattedTime}`}</Text>
                     
                </View>
            </TouchableOpacity>
        );
    };
    
    return (
        <View className=' bg-[#4E5CFF] h-full'>
            <Text className='text-lg py-4 text-white'>There are {attendeesData.length} {attendeesData.length == 1 ? 'attendee' : 'attendees'}</Text>
            <View>
                <FlatList
                    data={attendeesData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderAttendeeItem}
                />
            </View>
        </View>
    );
};

export default Attendance;
