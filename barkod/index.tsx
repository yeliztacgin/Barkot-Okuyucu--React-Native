import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, Alert, ScrollView, FlatList } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import { useRouter } from 'expo-router';

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scannedDataList, setScannedDataList] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      // Kamera izni almak için kullanıcıya bilgi ver
      Alert.alert(
        'Kamera İzni Gerekli',
        'Uygulamanın çalışabilmesi için kamera izni gereklidir.',
        [
          {
            text: 'İzin Ver',
            onPress: async () => {
              const { status } = await Camera.requestCameraPermissionsAsync();
              if (status === 'granted') {
                setHasPermission(true);
              } else {
                setHasPermission(false);
                Alert.alert(
                  'Kamera Erişimi',
                  'Kamera erişimi verilmedi. Ana sayfaya yönlendiriliyorsunuz.',
                  [
                    { text: 'Tamam', onPress: () => router.push('/home') }, // Ana sayfaya yönlendirme
                  ]
                );
              }
            }
          },
          {
            text: 'İptal',
            onPress: () => router.push('/home'), // İptal edilirse ana sayfaya yönlendir
            style: 'cancel'
          }
        ]
      );
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string, data: string }) => {
    setScanned(true);
    setScannedDataList([...scannedDataList, data]);
    Alert.alert('Barkod Tarandı', `Barkod tipi: ${type} \nBarkod verisi: ${data}`, [
      { text: 'Tamam', onPress: () => setScanned(false) }
    ]);
  };

  if (hasPermission === null) {
    return <Text>Kamera izni isteniyor...</Text>;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Kameraya erişim izni yok. Lütfen ayarlardan kameraya erişim izni verin.</Text>
        <Button title={'Ana Sayfaya Dön'} onPress={() => router.replace({
      pathname:"/barkod"
     })} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.overlay} />
      </View>
      {scanned && (
        <Button title={'Tekrar Tara'} onPress={() => setScanned(false)} />
      )}
      <ScrollView style={styles.dataContainer}>
        <FlatList
          data={scannedDataList}
          renderItem={({ item, index }) => (
            <Text key={index} style={styles.text}>Taranan veri: {item}</Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#000', // Karanlık tema için
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: '25%',
    left: '10%',
    width: '80%',
    height: '50%',
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 10,
  },
  dataContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    maxHeight: '30%', // Listeleme alanı
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    paddingVertical: 5,
  },
});
