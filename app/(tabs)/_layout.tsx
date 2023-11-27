import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Redirect, Tabs } from 'expo-router';
import { Pressable, Text, useColorScheme } from 'react-native';
import useAccountStore from '../../store/AccountStore';

import Colors from '../../constants/Colors';
import { AntDesign, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import { useSession } from '../../ctx';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session, isLoading} = useSession();
  const {account}:any = useAccountStore()

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Timeline',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="timeline-alert-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person-circle-outline" color={color} size={25}/>,
        }}
      />
      {
        account == 'Lecturer'?  (
          <Tabs.Screen
            name="reports"
            options={{
              title: 'Reports',
              tabBarIcon: ({ color }) => <AntDesign name="piechart" color={color} size={20}/>,
            }}
          />
        ) : (
          <Tabs.Screen
            name="reports"
            options={{
              title: 'Reports',
              href:null,
              tabBarIcon: ({ color }) => <AntDesign name="piechart" color={color} size={20}/>,
            }}
          />
        )
      }
    </Tabs>
  );
}
