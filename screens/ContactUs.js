import { ScrollView, Text, View } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import * as Animatable from 'react-native-animatable';

const ContactUs = () => {
  return (
    <ScrollView>
        <Animatable.View
            animation='fadeInDown'
            duration={2000}
            delay={1000}
        >
            <Card
                wrapperStyle={{ margin: 20 }}
            >
                <Card.Title>Contact Information</Card.Title>
                <Card.Divider />
                <Text>Balhala Trainings</Text>
                <Text >Mexicali, Baja California</Text>
                <Text style={{ marginBottom: 10 }}>MEXICO</Text>
                <Text>Phone: 123-456-7890</Text>
                <Text>Email: email@hotmail.com</Text>
            </Card>
        </Animatable.View>
    </ScrollView>
  )
}

export default ContactUs;