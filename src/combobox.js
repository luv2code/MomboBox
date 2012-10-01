/* 
	ComboBox Object 
	http://www.zoonman.com/projects/combobox/
	
	
	Copyright (c) 2011, Tkachev Philipp
	All rights reserved.
	BSD License
	
*/
ComboBox = function (options) {
	// Edit element cache 
	this.edit = options.input;
	// Items Container 
	this.dropdownlist = options.menu;
	// Current Item
	this.currentitem = null;
	// Current Item Index
	this.currentitemindex = null;
	// Visible Items Count
	this.visiblecount = 0;
	// Closure Object
	var self = this;
	// Picker
	var pick = options.button;
	pick.onclick =function () {
		self.edit.focus();
	};
	// Show Items when edit get focus
	this.edit.onfocus = function () {
		self.dropdownlist.style.display = 'block';
	};
	// Hide Items when edit lost focus
	this.edit.onblur = function () {
		setTimeout(function () {self.dropdownlist.style.display = 'none';}, 150);
	};
	// Get Items
	this.listitems = this.dropdownlist.getElementsByTagName('A');
	for (var i=0;i < this.listitems.length; i++) {
		var t = i;
		// Binding Click Event
		this.listitems[i].onclick = function () {
			var upv = this.innerHTML;   
			self.edit.value = upv;
			self.dropdownlist.style.display = 'none';
			return false;
		}
		// Binding OnMouseOver Event
		this.listitems[i].onmouseover = function (e) {
			for (var i=0;i < self.listitems.length; i++) {
				if (this == self.listitems[i]) {
					if (self.currentitem) {
						self.currentitem.className = self.currentitem.className.replace(/selected/g, '')
					}
					self.currentitem = self.listitems[i];
					self.currentitemindex = i;
					self.currentitem.className += ' selected';
				}
			}
		}
	};
	// Binding OnKeyDown Event
	this.edit.onkeydown = function (e) {
		e = e || window.event;	
		// Move Selection Up
		if (e.keyCode == 38) {
			// up
			var cn =0;
			if (self.visiblecount > 0) {
				if (self.visiblecount == 1) {
					self.currentitemindex = self.listitems.length-1;
				}
				do {
					self.currentitemindex--;
					cn++;
				} 
				while (self.currentitemindex>0 && self.listitems[self.currentitemindex].style.display == 'none');
				if(self.currentitemindex < 0) self.currentitemindex = self.listitems.length-1;
				
				if (self.currentitem) {
                    $(self.currentitem).removeClass('selected');
				}
				self.currentitem = self.listitems[self.currentitemindex];
                $(self.currentitem).addClass('selected');
				self.currentitem.scrollIntoView(false);
			}
			e.cancelBubble = true;
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
		// Move Selection Down
		else if (e.keyCode == 40){
			// down
			var ic=0;
			if (self.visiblecount > 0) {
				do {
					self.currentitemindex++;
				}
				while (self.currentitemindex < self.listitems.length && self.listitems[self.currentitemindex].style.display == 'none');
				if(self.currentitemindex >= self.listitems.length) self.currentitemindex = 0;
				
				if (self.currentitem) {
                    $(self.currentitem).removeClass('selected');
				}
				self.currentitem = self.listitems[self.currentitemindex];
                $(self.currentitem).addClass('selected');
				self.currentitem.scrollIntoView(false);
			}
			e.cancelBubble = true;
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
		
	};
	this.edit.onkeyup = function (e) {
		e = e || window.event;	
		if (e.keyCode == 13) {
			// enter
			if (self.visiblecount != 0) {
				var upv = self.currentitem.innerHTML;
				self.edit.value = upv;
			}
			self.dropdownlist.style.display = 'none';
			e.cancelBubble = true;
			return false;
		}
		else {
			self.dropdownlist.style.display = 'block';
			self.visiblecount = 0;
			if (self.edit.value == '') {
				for (var i=0;i < self.listitems.length; i++) {
					self.listitems[i].style.display = 'block';
					self.visiblecount++;
                    $(self.listitems[i]).removeClass('match');
				}
			}
			else {
				var re = new RegExp( '('+self.edit.value +')',"i");
				for (var i=0;i < self.listitems.length; i++) {
					var pv = self.listitems[i].innerHTML;
					if ( re.test(pv) ) {
						self.listitems[i].style.display = 'block';
						self.visiblecount++;
                        $(self.listitems[i]).addClass('match');
					}
					else {
                        $(self.listitems[i]).removeClass('match');
//						self.listitems[i].style.display = 'none';
					}
				}
			}
		}
	}
}
