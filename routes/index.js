var express = require('express');
var model = require('../model');
var markdown = require('markdown').markdown;
// ����һ��·��ʵ��
var router = express.Router();

/* GET home page. ���û�����/·����ʱ��ִ�д˻ص����� */
router.get('/', function(req, res, next) {
  res.redirect('/article/list/1/2');
});

module.exports = router;
