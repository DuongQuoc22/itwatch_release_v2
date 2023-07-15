app.controller("account-ctrl", function($scope, $http, $location) {
	//alert("acoount")
	$scope.items = [];
	$scope.form = [];
	$scope.roles = [];
	$scope.admins = [];
	$scope.authorities = [];
	$scope.checkadmin= [];

	$scope.initialize = function() {
		//load account
		$http.get("/rest/accounts/checkRole").then(resp => {
			 
				if(resp.data == true){
					$scope.checkadmin = true;
					$http.get("/rest/accounts").then(resp => {debugger;
						$scope.items = resp.data;
						$scope.items.forEach(item => {
						item.birthdate = new Date(item.birthdate)
						})
						$scope.reset();
					})
				}else{
					$http.get("/rest/accounts/acountUser").then(resp => {
						$scope.checkadmin = false;
						$scope.items = resp.data;
						$scope.items.forEach(item => {
						item.birthdate = new Date(item.birthdate)
						})
						$scope.reset();
					})
				}
				
		})
		
		

		//load all roles
		$http.get("/rest/roles").then(resp => {debugger;
			$scope.roles = resp.data;
		})
		
		//load staffs và directors (administrators)
		$http.get(`/rest/accounts?admin=true`).then(resp => {
			$scope.admins = resp.data;
		})

		//load authorities of staff và directors
		$http.get(`/rest/authorities?admin=true`).then(resp => {
			$scope.authorities = resp.data
		}).catch(error => {
			$location.path("/unauthorized")
		})

	}



	//khởi đầu
	$scope.initialize();
	//hiện lên form
	$scope.edit = function(item) {
		//alert("edit")
		$scope.form = angular.copy(item);
		$(".nav-tabs a:eq(1)").tab('show')
	}
	//xóa form
	$scope.reset = function() {
		//alert("Xóa Form")
		$scope.form = {
			//birthdate: new Date(),
            image: 'cloud-upload.jpg',
            status: true,
		}
	}
	
	//Lấy giá trị ô input=text nhập vào
	function getValueInput(id){
		return document.getElementById(id).value.trim();
	}
	
	//validate
	$scope.validate = function() {
	//alert("Check trống")
	var username=getValueInput('username');
	var fullname=getValueInput('fullname');
	var sdt=getValueInput('sdt');
	var password=getValueInput('password');
	var email=getValueInput('email');
	var adress=getValueInput('adress');
	var image=getValueInput('image');
	var bithdate=getValueInput('bithdate');
	
	if(username ==""){
		alert("Không để trống username")
	}else if(fullname==""){	
	alert("Không để trống fullname")
	}else if(sdt==""){	
	alert("Không để trống số điện thoại")
	}else if(password==""){	
	alert("Không để trống password")
	}else if(email==""){	
	alert("Không để trống email")
	}else if(adress==""){	
	alert("Không để trống địa chỉ")
	}else if(adress==""){	
	alert("Không để trống địa chỉ")
	}else if(bithdate==""){	
	alert("Không để trống bithdate")
	}else if(image==""){	
	alert("Không để trống image")
	}else{
		if(sdt != ""){
			var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
			if (vnf_regex.test(sdt) == false){
            	alert('Số điện thoại của bạn không đúng định dạng!');
            	return false;
        	}
		}
		
		if(email!=""){
			var email =  document.getElementById('email');
			if(email.value.length > 0){
				var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
				var flag = re.test(email.value);
				if(flag == false){
					alert('Đề nghị NTT nhập email đúng định dạng quy định');
					setTimeout(function(){
						$(email).focus();
					}, 100);
					$(email).val('');
					return false;
				}
				//return flag;
			}
			
		}
		
		
	//Điều kiện đúng
	console.log("Dữ liệu oke");
	
	
	$scope.create();	
	return true;
	}
	console.log("chạy đến false")
			return false;
	}
	
	
 $scope.validateEmail = function(e){
	if(e.value.length > 0){
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		var flag = re.test(e.value);
		if(flag == false){
			alert('Đề nghị NTT nhập email đúng định dạng quy định');
			setTimeout(function(){
				$(e).focus();
			}, 100);
			$(e).val('');
		}
		return flag;
	}
	else{
		return true;
	}
}
	
	//thêm account mới
	$scope.create = function() {
		//alert("Thêm sp")
		var item = angular.copy($scope.form);
		
		$http.post(`/rest/accounts/`, item).then(resp => { 
		
				if(resp.data.phone ==""){
					alert("Số điện thoại đã được sử dụng");
					return false;
				}
				
				if(resp.data.email ==""){
					alert("Email đã được sử dụng");
					return false;
				}
				$scope.items.push(resp.data);
				
				$scope.reset();
				alert("Thêm mới thành công");
				$(".nav-tabs a:eq(0)").tab('show')
			}).catch(error => {
				alert("Lỗi Thêm mới account");
				console.log("error", error);
			});		
	}
	//cập nhật account
	$scope.update = function() {
		//alert("update sp")
		var item = angular.copy($scope.form);
		$http.put(`/rest/accounts/${item.username}`, item).then(resp => {
			var index = $scope.items.findIndex(p => p.username == item.username);
			$scope.items[index] = item;
			alert("cập nhật Account thành công");
			$(".nav-tabs a:eq(0)").tab('show')
		}).catch(error => {
			alert("Lỗi cập nhật Account" + error);
			console.log("error", error);
		})
	}
	//xóa account
	$scope.delete = function(item) {
		//alert("delete sp")
		/*$http.delete(`/rest/accounts/${item.accountId}`).then(resp => {
			var index = $scope.items.findIndex(p => p.accountId == item.accountId);
			$scope.items.splice(index, 1);
			$scope.reset();
			alert("Xóa Thành Công");
		}).catch(error => {
				alert("Lỗi xóa Account"  + error);
			})*/
			
		//alert("update sp")
		var item = angular.copy($scope.form);
		$http.put(`/rest/accounts/delete/${item.username}`, item).then(resp => {
			var index = $scope.items.findIndex(p => p.username == item.username);
			$scope.items[index] = item;
			alert("Xóa Account thành công");
			$scope.initialize();
		}).catch(error => {
			alert("Lỗi xóa Account" + error);
			console.log("error", error);
		})	
	}

	//upload hình
	$scope.imageChanged = function(files) {
		//alert("hìn")
		var data = new FormData();
		data.append('file', files[0]);
		$http.post('/rest/upload/images', data, {
			transformRequest: angular.identity,
			headers: { 'Content-Type': undefined }
		}).then(resp => {
			$scope.form.image = resp.data.name;
		}).catch(error => {
			alert("Lỗi upload hình" + error);
			console.log("Error", error);
		})
	}
	
	$///tìm kiếm
    $scope.timKiem = function () {
        var name = document.getElementById("keyword").value;
        var trangThai = document.getElementById("trangThai").value;
        if (trangThai == "") {
            trangThai = null;
            if(name ==""){
				name ="null";
			}
            //alert("Tìm Kiếm: " + username + " trang thai= " + trangThai)
            $http.get(`/rest/accounts/timKiem/${name}/${trangThai}`).then(resp => {
                $scope.items = resp.data;
            })
        } else {
            $http.get(`/rest/accounts/${name}/${trangThai}`).then(resp => {
                $scope.items = resp.data;
            })
        }
       
    }
    $scope.genderStart = function (obj) {
        var trangThai = document.getElementById("trangThai").value;
        //alert("Trang thái " + trangThai )
        if (trangThai == "") {
            $http.get("/rest/accounts").then(resp => {
                $scope.items = resp.data;
            })
        } else {
            $http.get(`/rest/accounts/timKiem/${trangThai}`).then(resp => {
                $scope.items = resp.data;
            })
        }

    }

	//phân trang
	$scope.pager = {
		page: 0,
		size: 10,
		get items() {
			var start = this.page * this.size;
			return $scope.items.slice(start, start + this.size);
		},
		get count() {
			return Math.ceil(1.0 * $scope.items.length / this.size);
		},
		first() {
			this.page = 0;
		},
		prev() {
			this.page--;
			if (this.page < 0) {
				this.last();
			}
		},
		next() {
			this.page++;
			if (this.page >= this.count) {
				this.first();
			}
		},
		last() {
			this.page = this.count - 1;
		}
	}

	//phân quyền
	$scope.authority_of = function(acc, role) {
		if ($scope.authorities) {
			return $scope.authorities.find(ur => ur.account.username == acc.username && ur.role.roleId == role.roleId);
		}
	}

	$scope.authority_changed = function(acc, role) {
		var authority = $scope.authority_of(acc, role);
		if (authority) {//đã cấp quyền => thu hồi quyền(xóa)
			$scope.revoke_authority(authority);
		}
		else {//chưa được cấp quyền => cấp quyền(thêm mới)
			authority = { account: acc, role: role };
			$scope.grant_authority(authority);
		} $scope.initialize();
	}

	//thêm mới authority
	$scope.grant_authority = function(authority) {
		$http.post(`/rest/authorities`, authority).then(resp => {
			$scope.authorities.push(resp.data)
			alert("Cấp quyền sử dụng thành công");
		}).catch(error => {
			alert("Cấp quyền sử dụng thất bại");
			console.log("Error", error)
		})
	}
	//Xóa authority
	$scope.revoke_authority = function(authority) {
		$http.delete(`/rest/authorities/${authority.authorityId}`).then(resp => {
			var index = $scope.authorities.findIndex(a => a.id == authority.authorityId);
			$scope.authorities.splice(index, 1);
			alert("Thu hồi quyền sử dụng thành công");
		}).catch(error => {
			alert("Thu hồi quyền sử dụng thất bại");
			console.log("Error", error);
		})
	}

	$scope.initialize();

})