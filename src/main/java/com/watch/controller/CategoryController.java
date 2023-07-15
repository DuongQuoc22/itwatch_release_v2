package com.watch.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.watch.entity.Category;
import com.watch.service.CategoryService;

@Controller
public class CategoryController {
	
	
	//Category
		@GetMapping("/itwatch/category")
		public String danhmuc(Model model) {	
			return"/user/product/sanPham";
		}
	
}
