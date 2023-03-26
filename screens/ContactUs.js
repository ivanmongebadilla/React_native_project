import { ScrollView, Text, View, ImageBackground, StyleSheet } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import * as Animatable from 'react-native-animatable';
import bgImg from '../images/background-img2.jpg'

const ContactUs = () => {
  return (
    <ScrollView contentContainerStyle={{height: '100%', width: '100%'}}>
        <ImageBackground
            source={bgImg}
            resizeMode="cover"
            style={styles.bgImage}
        >
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
        </ImageBackground>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
    bgImage: { 
      flex: 1,
      justifyContent: 'center',
    }
  });

export default ContactUs;