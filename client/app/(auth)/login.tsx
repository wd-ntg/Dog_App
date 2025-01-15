import React, { useState } from 'react';

declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifier;
    }
}
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAgy7dQFuBnPDCWOULwCWUvTWlbkW8lHRY",
    authDomain: "petapp-d9455.firebaseapp.com",
    projectId: "petapp-d9455",
    storageBucket: "petapp-d9455.firebasestorage.app",
    messagingSenderId: "511097061085",
    appId: "1:511097061085:web:c256e02efd08dd560e2534"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const PhoneLogin: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [confirmationResult, setConfirmationResult] = useState<any>(null);

    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                auth,
                "recaptcha-container",
                { size: "invisible" },
            );
        }
    };

    const sendOTP = async () => {
        if (!phoneNumber) {
            Alert.alert('Please enter a phone number');
            return;
        }

        try {
            setupRecaptcha();
            const appVerifier = window.recaptchaVerifier;
            const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
            setConfirmationResult(result);
            Alert.alert('OTP sent successfully!');
        } catch (error: any) {
            console.error('Error sending OTP:', error);
            Alert.alert('Error sending OTP:', error.message || 'Unknown error');
        }
    };

    const verifyOTP = async () => {
        if (!otp) {
            Alert.alert('Please enter the OTP');
            return;
        }

        try {
            const result = await confirmationResult.confirm(otp);
            Alert.alert('User signed in successfully!', `UID: ${result.user.uid}`);
        } catch (error: any) {
            console.error('Error verifying OTP:', error);
            Alert.alert('Error verifying OTP:', error.message || 'Unknown error');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Phone Login</Text>

            <View id="recaptcha-container"></View>

            <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />
            <Button title="Send OTP" onPress={sendOTP} />

            {confirmationResult && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter OTP"
                        keyboardType="numeric"
                        value={otp}
                        onChangeText={setOtp}
                    />
                    <Button title="Verify OTP" onPress={verifyOTP} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});

export default PhoneLogin;
