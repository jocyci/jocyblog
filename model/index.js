/**
 * Created by jocyci on 2016/6/1.
 */
var mongoose = require('mongoose');
// 1.�������ݿ�
mongoose.connect('mongodb://localhost:27017/jocyblog');

// 2.����schema
var userSchama = new mongoose.Schema({
    username:{type:String},// �û���
    password:{type:String},// ����
    email:{type:String},// ����
    avatar:{type:String}//ͷ��
});

// 3.����ģ��
var userModel = mongoose.model('user',userSchama);

// 4.�����û�ģ��
module.exports = {
    user:userModel
}