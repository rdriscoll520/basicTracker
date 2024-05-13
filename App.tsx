import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, TextInput, Button, TouchableOpacity, ListRenderItemInfo } from 'react-native';

interface Task {
  key: string;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState<string>('');

  const addTask = () => {
    if (text) {
      setTasks([...tasks, { key: Date.now().toString(), text, completed: false }]);
      setText('');
    }
  };

  const markTaskComplete = (key: string) => {
    setTasks(tasks.map(task =>
      task.key === key ? { ...task, completed: true } : task
    ));
  };

  const removeCompletedTasks = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder="Add a new task"
        />
        <Button title="Add Task" onPress={addTask} />
        <Button title="Clear Completed" onPress={removeCompletedTasks} color="#ff6347" />
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }: ListRenderItemInfo<Task>) => (
          <View style={styles.item}>
            <Text style={[styles.text, item.completed && styles.completedText]}>{item.text}</Text>
            {!item.completed && (
              <TouchableOpacity style={styles.checkmarkButton} onPress={() => markTaskComplete(item.key)}>
                <Text style={styles.checkmarkText}>✔️</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        keyExtractor={item => item.key}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',  // Ensures all items in this view are vertically centered
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    justifyContent: 'space-between',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  text: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginRight: 8,
  },
  checkmarkButton: {
    padding: 10,
  },
  checkmarkText: {
    fontSize: 20,
  },
});

export default App;
