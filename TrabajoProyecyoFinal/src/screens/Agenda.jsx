import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Picker } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene.',
    'Feb.',
    'Mar.',
    'Abr.',
    'May.',
    'Jun.',
    'Jul.',
    'Ago.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dic.',
  ],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
};
LocaleConfig.defaultLocale = 'es';

export default function Agenda() {
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().split('T')[0]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [appointmentTime, setAppointmentTime] = useState('08:00 AM'); // Valor inicial
  const [appointmentSubject, setAppointmentSubject] = useState('');
  const [appointmentNotes, setAppointmentNotes] = useState('');

  const allPossibleHours = [
    '06:00 AM',
    '07:00 AM',
    '08:00 AM',
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
    '08:00 PM',
    '09:00 PM',
    '10:00 PM',
    // Agrega más horas si es necesario
  ];

  // Función para cambiar de mes
  const changeMonth = (newMonth) => {
    setCurrentMonth(newMonth.dateString);
  };

  // Función para mostrar el modal al hacer clic en un número del calendario
  const openModal = (date) => {
    setSelectedDate(date.dateString);
    setModalVisible(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedDate(null);
    setModalVisible(false);
  };

  // Función para guardar la cita
  const saveAppointment = () => {
    // Aquí puedes guardar la cita en tu base de datos o realizar la acción necesaria
    // También puedes reiniciar los valores de los campos si es necesario
    setAppointmentTime('08:00 AM'); // Restaura el valor inicial
    setAppointmentSubject('');
    setAppointmentNotes('');
    closeModal(); // Cierra el modal después de guardar
  };

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Svg height="150" width="150">
          <Circle cx="75" cy="75" r="60" fill="#03C4D0" stroke="#0186A0" strokeWidth={2} />
        </Svg>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Próximo turno</Text>
          <Text style={styles.timerText}>2/3</Text>
          <Text style={styles.timerLabel}>14:00</Text>
        </View>
      </View>

      <View style={styles.calendarContainer}>
        <Calendar
          current={currentMonth}
          onMonthChange={(newMonth) => changeMonth(newMonth)}
          onDayPress={(date) => openModal(date)}
          renderArrow={(direction) => <ArrowComponent direction={direction} />}
        />
      </View>

      {isModalVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>AGREGAR CITA - {selectedDate}</Text>
            <View style={styles.timePickerContainer}>
              <Picker
                selectedValue={appointmentTime}
                style={styles.timePicker}
                onValueChange={(itemValue) => setAppointmentTime(itemValue)}
              >
                {allPossibleHours.map((hour, index) => (
                  <Picker.Item key={index} label={hour} value={hour} />
                ))}
              </Picker>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Asunto de la cita"
              value={appointmentSubject}
              onChangeText={(text) => setAppointmentSubject(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Notas de la cita"
              value={appointmentNotes}
              onChangeText={(text) => setAppointmentNotes(text)}
              multiline
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={saveAppointment}>
                <Text>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const ArrowComponent = ({ direction }) => (
  <View style={styles.arrowContainer}>
    {direction === 'left' ? <Text>{'<'}</Text> : null}
    {direction === 'right' ? <Text>{'>'}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  circleContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 35,
  },
  timerText: {
    position: 'absolute',
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    top: 15,
  },
  timerLabel: {
    position: 'absolute',
    fontSize: 16,
    color: 'white',
    top: 60,
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 5,
  },
  calendarContainer: {
    flex: 1,
    marginTop: 20,
    padding: 20,
  },
  arrowContainer: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  timePicker: {
    flex: 1,
    height: 40,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 5,
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#03C4D0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});
