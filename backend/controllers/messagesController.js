import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { getSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { textMessage, receiverId } = req.body;
        const senderId = req.user.id;
        console.log(senderId, textMessage, receiverId);



        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: []
            })
        }

        const message = await Message.create({
            senderId, receiverId, message: textMessage
        })

        conversation.messages.push(message._id);
        await conversation.save();
        const receiverSocketId = getSocketId(receiverId);
        const senderSocketId = getSocketId(senderId);
        console.log("reciver", receiverSocketId)

        io.to(receiverSocketId).emit('newMessage', message);
        io.to(senderSocketId).emit('newMessage', message);

        return res.json({ success: true, message: "Message sent", newMessage:message })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message });


    }
}

export const getConversation = async (req, res) => {
    try {
        const { receiverId } = req.body;
        const senderId = req.user.id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");

        return res.json({ success: true, message: "Get conversation", conversation });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
