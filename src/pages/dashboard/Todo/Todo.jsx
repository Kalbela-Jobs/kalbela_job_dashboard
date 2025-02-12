

import { useState, useCallback } from "react"
import {
      Calendar,
      Modal,
      Form,
      Input,
      Button,
      Badge,
      Tooltip,
      Card,
      Typography,
      Popconfirm,
      Switch,
      Popover,
      message,
} from "antd"
import { EditOutlined, DeleteOutlined, CheckOutlined, CalendarOutlined } from "@ant-design/icons"
import { motion, AnimatePresence } from "framer-motion"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

const { TextArea } = Input
const { Title, Text } = Typography

const TodoCalendar = () => {
      const [tasks, setTasks] = useState([])
      const [isModalVisible, setIsModalVisible] = useState(false)
      const [selectedDate, setSelectedDate] = useState(null)
      const [editingTaskIndex, setEditingTaskIndex] = useState(null)
      const [isDarkMode, setIsDarkMode] = useState()
      const [form] = Form.useForm()

      const dateCellRender = (value) => {
            const listData = tasks.filter((task) => task.date.isSame(value, "day"))
            return (
                  <ul className="events p-0">
                        {listData.map((item, index) => (
                              <li key={index} className="list-none">
                                    <Badge status={item.completed ? "success" : "processing"} />
                              </li>
                        ))}
                  </ul>
            )
      }

      const onSelect = (newValue) => {
            setSelectedDate(newValue)
            setEditingTaskIndex(null)
            setIsModalVisible(true)
            form.resetFields()
      }

      const handleOk = () => {
            form.validateFields().then((values) => {
                  if (editingTaskIndex !== null) {
                        const updatedTasks = [...tasks]
                        updatedTasks[editingTaskIndex] = { ...updatedTasks[editingTaskIndex], content: values.task }
                        setTasks(updatedTasks)
                  } else {
                        setTasks([...tasks, { date: selectedDate, content: values.task, completed: false }])
                  }
                  setIsModalVisible(false)
                  message.success(`Task ${editingTaskIndex !== null ? "updated" : "added"} successfully!`)
            })
      }

      const handleCancel = () => {
            setIsModalVisible(false)
            form.resetFields()
      }

      const editTask = (date, index) => {
            const task = tasks.find((task, i) => task.date.isSame(date, "day") && i === index)
            if (task) {
                  form.setFieldsValue({ task: task.content })
                  setSelectedDate(date)
                  setEditingTaskIndex(index)
                  setIsModalVisible(true)
            }
      }

      const deleteTask = (date, index) => {
            const updatedTasks = tasks.filter((task, i) => !(task.date.isSame(date, "day") && i === index))
            setTasks(updatedTasks)
            message.success("Task deleted successfully!")
      }

      const completeTask = (date, index) => {
            const updatedTasks = tasks.map((task, i) =>
                  task.date.isSame(date, "day") && i === index ? { ...task, completed: !task.completed } : task,
            )
            setTasks(updatedTasks)
            message.success(`Task marked as ${updatedTasks[index].completed ? "completed" : "incomplete"}!`)
      }

      const toggleTheme = () => {
            setIsDarkMode(!isDarkMode)
      }

      const onDragEnd = useCallback(
            (result) => {
                  if (!result.destination) return

                  const newTasks = Array.from(tasks)
                  const [reorderedTask] = newTasks.splice(result.source.index, 1)
                  newTasks.splice(result.destination.index, 0, reorderedTask)

                  setTasks(newTasks)
            },
            [tasks],
      )

      const getListData = (value) => {
            return tasks.filter((task) => task.date.isSame(value, "day"))
      }

      const dateFullCellRender = (value) => {
            const listData = getListData(value)
            return (
                  <Popover
                        content={
                              <div className="max-w-[300px]">
                                    {listData.length > 0 ? (
                                          listData.map((item, index) => (
                                                <div key={index} className="mb-2">
                                                      <Text className="text-black " delete={item.completed}>{item.content}</Text>
                                                </div>
                                          ))
                                    ) : (
                                          <Text>No tasks for this day</Text>
                                    )}
                              </div>
                        }
                        title={`Tasks for ${value.format("MMMM D, YYYY")}`}
                        trigger="hover"
                  >
                        <div className="ant-picker-cell-inner  ant-picker-calendar-date">
                              <div className="ant-picker-calendar-date-value">{value.date()}</div>
                              <div className="ant-picker-calendar-date-content">
                                    <ul className="events">
                                          {listData.map((item, index) => (
                                                <li key={index}>
                                                      <Badge status={item.completed ? "success" : "processing"} />
                                                </li>
                                          ))}
                                    </ul>
                              </div>
                        </div>
                  </Popover>
            )
      }

      return (
            <div
                  className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100"} transition-colors duration-300`}
            >

                  <div className="container mx-auto p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                              <Card className="col-span-2 shadow-2xl rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-3xl">
                                    <Calendar
                                          dateFullCellRender={dateFullCellRender}
                                          onSelect={onSelect}
                                          className={`custom-calendar  ${isDarkMode ? "dark" : ""}`}
                                    />
                              </Card>
                              <Card
                                    className={`shadow-2xl rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-3xl ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
                              >
                                    <Title level={4} className={`mb-4 ${isDarkMode ? "text-white" : ""}`}>
                                          All Tasks
                                    </Title>
                                    <DragDropContext onDragEnd={onDragEnd}>
                                          <Droppable droppableId="taskList">
                                                {(provided) => (
                                                      <div
                                                            {...provided.droppableProps}
                                                            ref={provided.innerRef}
                                                            className="space-y-4 mb-4  max-h-[calc(100vh-300px)] overflow-auto pr-2"
                                                      >
                                                            <AnimatePresence>
                                                                  {tasks
                                                                        .sort((a, b) => a.date - b.date)
                                                                        .map((task, index) => (
                                                                              <Draggable key={index} draggableId={`task-${index}`} index={index}>
                                                                                    {(provided) => (
                                                                                          <motion.div
                                                                                                ref={provided.innerRef}
                                                                                                {...provided.draggableProps}
                                                                                                {...provided.dragHandleProps}
                                                                                                initial={{ opacity: 0, y: 20 }}
                                                                                                animate={{ opacity: 1, y: 0 }}
                                                                                                exit={{ opacity: 0, y: -20 }}
                                                                                                transition={{ duration: 0.2 }}
                                                                                                className={`flex border justify-between items-center p-3 rounded-lg shadow-md transition-all duration-300 ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-50"
                                                                                                      }`}
                                                                                          >
                                                                                                <div>
                                                                                                      <div>
                                                                                                            <Text type="secondary" className={isDarkMode ? "text-gray-400" : ""}>
                                                                                                                  {task.date.format("MMM D, YYYY")}
                                                                                                            </Text>
                                                                                                            <div className="space-x-2">
                                                                                                                  <Tooltip title={task.completed ? "Mark as incomplete" : "Mark as complete"}>
                                                                                                                        <Button
                                                                                                                              icon={<CheckOutlined />}
                                                                                                                              onClick={() => completeTask(task.date, index)}
                                                                                                                              className={`transition-colors duration-300 ${task.completed
                                                                                                                                    ? "bg-green-500 text-white hover:bg-green-600"
                                                                                                                                    : isDarkMode
                                                                                                                                          ? "bg-gray-600 text-white hover:bg-gray-500"
                                                                                                                                          : "bg-gray-200 hover:bg-gray-300"
                                                                                                                                    }`}
                                                                                                                        />
                                                                                                                  </Tooltip>
                                                                                                                  <Tooltip title="Edit">
                                                                                                                        <Button
                                                                                                                              icon={<EditOutlined />}
                                                                                                                              onClick={() => editTask(task.date, index)}
                                                                                                                              className={`transition-colors duration-300 ${isDarkMode
                                                                                                                                    ? "bg-gray-600 text-white hover:bg-gray-500"
                                                                                                                                    : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                                                                                                                                    }`}
                                                                                                                        />
                                                                                                                  </Tooltip>
                                                                                                                  <Tooltip title="Delete">
                                                                                                                        <Popconfirm
                                                                                                                              title="Are you sure you want to delete this task?"
                                                                                                                              onConfirm={() => deleteTask(task.date, index)}
                                                                                                                              okText="Yes"
                                                                                                                              cancelText="No"
                                                                                                                        >
                                                                                                                              <Button
                                                                                                                                    danger
                                                                                                                                    icon={<DeleteOutlined />}
                                                                                                                              // className={`transition-colors duration-300 ${isDarkMode
                                                                                                                              //       ? "bg-red-600 text-white hover:bg-red-700"
                                                                                                                              //       : "bg-red-100 text-red-600 hover:bg-red-200"
                                                                                                                              //       }`}
                                                                                                                              />
                                                                                                                        </Popconfirm>
                                                                                                                  </Tooltip>
                                                                                                            </div>
                                                                                                      </div>
                                                                                                      <br />
                                                                                                      <Text delete={task.completed} className={isDarkMode ? "text-white bg-red-500" : ""}>
                                                                                                            {task.content}
                                                                                                      </Text>
                                                                                                </div>

                                                                                          </motion.div>
                                                                                    )}
                                                                              </Draggable>
                                                                        ))}
                                                            </AnimatePresence>
                                                            {provided.placeholder}
                                                      </div>
                                                )}
                                          </Droppable>
                                    </DragDropContext>
                              </Card>
                        </div>

                        <Modal
                              title={
                                    <span className={isDarkMode ? "text-white" : ""}>
                                          {`${editingTaskIndex !== null ? "Edit Task" : "Add Task"} for ${selectedDate ? selectedDate.format("MMMM D, YYYY") : ""}`}
                                    </span>
                              }
                              open={isModalVisible}
                              onOk={handleOk}
                              onCancel={handleCancel}
                              destroyOnClose={true}
                              className={isDarkMode ? "dark-modal" : ""}
                        >
                              <Form form={form} layout="vertical">
                                    <Form.Item
                                          name="task"
                                          label={<span className={isDarkMode ? "text-white" : ""}>Task</span>}
                                          rules={[{ required: true, message: "Please enter a task" }]}
                                    >
                                          <TextArea rows={4} placeholder="Enter your task here" className="w-full" />
                                    </Form.Item>
                              </Form>
                        </Modal>
                  </div>
            </div>
      )
}

export default TodoCalendar
