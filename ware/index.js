/**
 * Created by jocyci on 2016/6/1.
 */
// 必须要求登录后才能访问/article/add
exports.checkLogin = function (req,res,next) {
    if(req.session.user) {
        next();
    } else {
        req.flash('error','你还未登录');
        return res.redirect('/users/login')
    }
}

// 必须要求未登录才能访问/users/reg
exports.checkNotLogin = function (req,res,next) {
    if(req.session.user) {
        req.flash('success','你已登录');
        return res.redirect('/')
    } else {
        next();
    }
}