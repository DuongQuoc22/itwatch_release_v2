package com.watch.controller;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.watch.dao.BrandDao;
import com.watch.dao.NewsDao;
import com.watch.dao.ProductDao;
import com.watch.entity.Brand;
import com.watch.entity.News;
import com.watch.entity.Product;
import com.watch.entity.Size;
import com.watch.entity.Strap_material;
import com.watch.service.BrandService;
import com.watch.service.NewsService;
import com.watch.service.ProductService;
import com.watch.service.SizeService;
import com.watch.service.StrapService;

@Controller
public class HomeController {
	@Autowired
	ProductService productService;
	@Autowired
	ProductDao pdao;

	@Autowired
	NewsDao ndao;
	@Autowired
	NewsService newsService;

	@Autowired
	BrandDao bdao;
	@Autowired
	BrandService brandService;
	
	@Autowired
	StrapService strapSv;
	
	@Autowired
	SizeService sizeSV;
	
	@Autowired 
    HttpSession session;
	
	//home người admin
	@GetMapping({"/","/admin","/admin/itwatch"})
	public String homeAmin(ModelMap model) {
		String nameAcount = (String) session.getAttribute("nameAcount");
		model.addAttribute("nameAcount",nameAcount);
		model.put("nameAcount", nameAcount);
		return "redirect:/assets/admin/main/homeAdmin.html";
	}
	
	//Home người dùng
	@GetMapping({"/itwatch","/itwatch/home"})
	public String homeClient(Model model) {
		List<Product> list = productService.findTop6Img();
		model.addAttribute("items", list);
		List<Strap_material> straps = strapSv.findAll();
		model.addAttribute("straps", straps);
		List<Size> sizes = sizeSV.findAll();
		model.addAttribute("sizes",sizes);
		
		List<Brand> listBrand = brandService.findAll();
		model.addAttribute("brands", listBrand);
		
		
		List<Brand> list2 = brandService.findTop4Img();
		model.addAttribute("items2", list2);

		List<News> list3 = newsService.findAll();
		model.addAttribute("items3", list3);

		List<News> list1= newsService.findAll();
		model.addAttribute("news", list1);

		return "/layout/homeClient";	
	}
}
