package com.watch.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.watch.entity.Accounts;
import com.watch.entity.UserAcounts;

@Controller
public class LoginController {
	@Autowired 
	HttpSession session;
	@Autowired
    UserAcounts useAcc;
	//Login
	@GetMapping("/login")
	public String login(HttpServletRequest request, Model model) {
		Accounts acount = useAcc.User();
		if(acount!=null) {
			model.addAttribute("message", "LOCK");
			request.getSession().setAttribute("message", "LOCK");
			session.removeAttribute("User");
			session.invalidate();
		}else {
			model.addAttribute("message", "");
			request.getSession().setAttribute("message", "");
		}
		
		return"/user/login/dangNhap";
	}
	//đăng ký
	@GetMapping("/registers")
	public String dangky() {
		return"/user/login/dangKyTK";
	}
	
	@GetMapping("/forgotPassword")
	public String quenMatKhau() {
		return"/user/quenMK";
	}
	
	@GetMapping("/logout")
	public String dangXuat() {
		session.removeAttribute("User");
		session.invalidate();
		return"redirect:/login";
	}
		
	
}
