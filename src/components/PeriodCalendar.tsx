import React, { useReducer } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import useStyles, { ColorsEnum } from '../hooks/useStyles';

interface PeriodCalendarProps {
  onSelect: (startDate: Date | null, endDate: Date | null) => void;
  onClose: () => void;
}

interface DateRangeState {
  startDate: Date | null;
  endDate: Date | null;
}

type DateRangeAction =
  | { type: 'SELECT_DATE'; date: Date }
  | { type: 'RESET' };

const dateRangeReducer = (
  state: DateRangeState,
  action: DateRangeAction,
): DateRangeState => {
  const normalizeDate = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  switch (action.type) {
    case 'SELECT_DATE': {
      const selectedDate = normalizeDate(action.date);

      // Если нет начальной даты или обе даты уже выбраны - начинаем новый выбор
      if (!state.startDate || (state.startDate && state.endDate)) {
        return {
          startDate: selectedDate,
          endDate: null,
        };
      }

      // Если есть начальная дата, но нет конечной
      if (state.startDate && !state.endDate) {
        const normalizedStart = normalizeDate(state.startDate);

        // Если выбрана та же дата - ничего не меняем
        if (selectedDate.getTime() === normalizedStart.getTime()) {
          return state;
        }

        // Если выбранная дата раньше начальной - меняем их местами
        if (selectedDate.getTime() < normalizedStart.getTime()) {
          return {
            startDate: selectedDate,
            endDate: normalizedStart,
          };
        } else {
          // Иначе startDate остается прежним, endDate становится selectedDate
          return {
            startDate: state.startDate,
            endDate: selectedDate,
          };
        }
      }

      return state;
    }
    case 'RESET':
      return {
        startDate: null,
        endDate: null,
      };
    default:
      return state;
  }
};

const PeriodCalendar: React.FC<PeriodCalendarProps> = ({ onSelect, onClose }) => {
  const { styles, fonts } = useStyles(createStyles);
  const [dateRange, dispatch] = useReducer(dateRangeReducer, {
    startDate: null,
    endDate: null,
  });
  const { startDate, endDate } = dateRange;

  // Генерируем месяцы динамически: текущий месяц и несколько месяцев вперед
  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const getMonths = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const monthsToShow = 3; // Показываем текущий месяц и 2 месяца вперед
    
    const months = [];
    for (let i = 0; i < monthsToShow; i++) {
      const monthIndex = currentMonth + i;
      const year = currentYear + Math.floor(monthIndex / 12);
      const month = monthIndex % 12;
      
      months.push({
        month,
        year,
        name: monthNames[month],
      });
    }
    
    return months;
  };

  const months = getMonths();

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    // Convert Sunday (0) to 7, and adjust for Monday as first day
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const normalizeDate = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const isDateInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    const normalizedDate = normalizeDate(date);
    const normalizedStart = normalizeDate(startDate);
    const normalizedEnd = normalizeDate(endDate);
    return normalizedDate >= normalizedStart && normalizedDate <= normalizedEnd;
  };

  const isStartDate = (date: Date) => {
    if (!startDate) return false;
    const normalizedDate = normalizeDate(date);
    const normalizedStart = normalizeDate(startDate);
    return normalizedDate.getTime() === normalizedStart.getTime();
  };

  const isEndDate = (date: Date) => {
    if (!endDate) return false;
    const normalizedDate = normalizeDate(date);
    const normalizedEnd = normalizeDate(endDate);
    return normalizedDate.getTime() === normalizedEnd.getTime();
  };

  const handleDatePress = (day: number, month: number, year: number) => {
    const selectedDate = new Date(year, month, day);
    dispatch({ type: 'SELECT_DATE', date: selectedDate });
  };

  const handleSelect = () => {
    onSelect(startDate, endDate);
    onClose();
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  const renderMonth = (monthData: { month: number; year: number; name: string }) => {
    const { month, year, name } = monthData;
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const days: (number | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return (
      <View key={`${month}-${year}`} style={styles.monthContainer}>
        <Text style={styles.monthTitle}>
          {name}, {year}
        </Text>
        <View style={styles.calendarGrid}>
          {days.map((day, index) => {
            if (day === null) {
              return <View key={index} style={styles.dayCell} />;
            }

            const date = new Date(year, month, day);
            const inRange = isDateInRange(date);
            const isStart = isStartDate(date);
            const isEnd = isEndDate(date);
            // Если выбрана только начальная дата (нет конечной), подсвечиваем её
            const isStartOnly = isStart && !endDate;

            return (
              <Pressable
                key={index}
                style={[
                  styles.dayCell,
                  inRange && !isEnd && styles.dayInRange,
                  isEnd && styles.dayEnd,
                  isStartOnly && styles.dayStartOnly,
                ]}
                onPress={() => handleDatePress(day, month, year)}
              >
                <Text
                  style={[
                    styles.dayText,
                    inRange && !isEnd && styles.dayTextInRange,
                    isEnd && styles.dayTextEnd,
                    isStartOnly && styles.dayTextStartOnly,
                  ]}
                >
                  {day}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.weekDaysRow}>
        {weekDays.map((day, index) => (
          <View key={index} style={styles.weekDayCell}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {months.map(renderMonth)}
      </ScrollView>

      <View style={styles.buttonsContainer}>
        <Pressable
          style={[
            styles.selectButton,
            (!startDate || !endDate) && styles.selectButtonDisabled,
          ]}
          onPress={handleSelect}
          disabled={!startDate || !endDate}
        >
          <Text style={styles.selectButtonText}>Выбрать</Text>
        </Pressable>
        <Pressable style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Сбросить</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PeriodCalendar;

const createStyles = (
  getColor: (light: ColorsEnum, dark: ColorsEnum) => string,
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: getColor('white', 'black'),
      paddingHorizontal: 16,
    },
    weekDaysRow: {
      flexDirection: 'row',
      marginBottom: 16,
    },
    weekDayCell: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    weekDayText: {
      fontSize: 14,
      color: '#777777',
      fontWeight: '400',
    },
    scrollView: {
      flex: 1,
    },
    monthContainer: {
      marginBottom: 40,
    },
    monthTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: getColor('black', 'white'),
      marginBottom: 16,
    },
    calendarGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    dayCell: {
      width: '14.28%',
      aspectRatio: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
      paddingVertical: 4,
    },
    dayText: {
      fontSize: 16,
      color: getColor('black', 'white'),
      fontWeight: '400',
    },
    dayInRange: {
      backgroundColor: '#F1F3F4',
    },
    dayEnd: {
      backgroundColor: '#3E6383',
      borderRadius: 8,
    },
    dayStartOnly: {
      backgroundColor: '#3E6383',
      borderRadius: 8,
    },
    dayTextInRange: {
      color: getColor('black', 'white'),
    },
    dayTextEnd: {
      color: '#FFFFFF',
      fontWeight: '500',
    },
    dayTextStartOnly: {
      color: '#FFFFFF',
      fontWeight: '500',
    },
    buttonsContainer: {
      paddingVertical: 24,
      gap: 12,
    },
    selectButton: {
      backgroundColor: '#3E6383',
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectButtonDisabled: {
      backgroundColor: '#DBDBDB',
    },
    selectButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '500',
    },
    resetButton: {
      paddingVertical: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    resetButtonText: {
      color: '#3E6383',
      fontSize: 16,
      fontWeight: '500',
    },
  });

