var express = require('express');
// ����һ��·��ʵ��
var router = express.Router();

/* GET home page. ���û�����/·����ʱ��ִ�д˻ص����� */
router.get('/', function(req, res, next) {
  var user = req.session.user;
  res.render('index', { title: '��ҳ'});
});

module.exports = router;
