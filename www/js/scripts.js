		//http://www.javascriptlint.com/online_lint.php
		//Funcoes do aplicativo
		var codigo_produto  = 0;
		var codigo_categoria  = 0;
		var nome_categoria = "";
		var resultados_busca = 0;
		var resultados = [];
		var categorias = [];
		
		 // alert dialog dismissed
		function alertDismissed() {
			// do something
		}
		
		function ContarResultados(){
			resultados_busca++;
		}
		
		function TrocarCodigo(codigo_informado){
			codigo_produto = codigo_informado;
			$.mobile.changePage("#tela4", { transition: "slideup"} );
		}
		
		function TrocarCategoria(codigo_informado){
			codigo_categoria = codigo_informado;
			for (var index=0; index<categorias.length; index++ ) {
				if (categorias[index].codigo == codigo_informado ) {
					nome_categoria =categorias[index].nome;
				}
			}
			$.mobile.changePage("#tela3", { transition: "slideup"} );
			
		}

		function echeck(str) {

			var at="@";
			var dot=".";
			var lat=str.indexOf(at);
			var lstr=str.length;
			var ldot=str.indexOf(dot);
			if (str.indexOf(at)==-1){
			   //alert("Invalid E-mail ID");
			   return false;
			}

			if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
			   //alert("Invalid E-mail ID");
			   return false;
			}

			if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
				//alert("Invalid E-mail ID");
				return false;
			}

			 if (str.indexOf(at,(lat+1))!=-1){
				//alert("Invalid E-mail ID");
				return false;
			 }

			 if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
				//alert("Invalid E-mail ID");
				return false;
			 }

			 if (str.indexOf(dot,(lat+2))==-1){
				//alert("Invalid E-mail ID");
				return false;
			 }
			
			 if (str.indexOf(" ")!=-1){
				//alert("Invalid E-mail ID")/
				return false;
			 }

			 return true;				
		}
		
		//Funcoes do carrinho de compras
		function Finalizar(){
			
			$.ajax({url: 'http://www.useversatille.com.br/xml/ajax_finaliza_pedido.php',
			data: {CPF : '44444444444'},
			type: 'post',                   
			async: 'true',
            dataType: 'text',
			beforeSend: function() {
			// This callback function will trigger before data is sent
			$.mobile.loading('show', {
				theme: "a",
				text: "Aguarde...",
				textonly: true,
				textVisible: true
			});
			},
			complete: function() {
				// This callback function will trigger on data sent/received complete
				$.mobile.loading('hide'); // This will hide ajax spinner
			},
			success: function (result) {
				
				if(result =="CLIENTE NAO LOCALIZADO") {
					navigator.notification.alert('O cliente nao foi localizado em nosso sistema!', alertDismissed, 'Versatille', 'OK'); 
					$.mobile.changePage("#main");
				}
				if(result =="ERRO") {
					navigator.notification.alert('Nao existem mais produtos em seu pedido!', alertDismissed, 'Versatille', 'OK'); 
					$.mobile.changePage("#main");
				}
				if(result =="SEM ESTOQUE") {
					navigator.notification.alert('Um dos produtos selecionados nao esta mais disponível em estoque!', alertDismissed, 'Versatille', 'OK'); 
					$.mobile.changePage("#main");
				}
				if(result =="OK") {
					navigator.notification.alert('Pedido de compra gravado com sucesso!', alertDismissed, 'Versatille', 'OK');
					$.mobile.changePage("#main");
				}				
			},
			error: function (request,error) {
				// This callback function will trigger on unsuccessful action                
				navigator.notification.alert('Houve um erro ao enviar suas informacoes!', alertDismissed, 'Versatille', 'OK');
			}
			});
			
		}
		
		function Remover(tmp_codigo){
			
			$.ajax({url: 'http://www.useversatille.com.br/xml/ajax_carrinho_remover.php',
			data: {id : tmp_codigo},
			type: 'post',                   
			async: 'true',
            dataType: 'text',
			beforeSend: function() {
			// This callback function will trigger before data is sent
			$.mobile.loading('show', {
				theme: "a",
				text: "Aguarde...",
				textonly: true,
				textVisible: true
			});
			},
			complete: function() {
				// This callback function will trigger on data sent/received complete
				$.mobile.loading('hide'); // This will hide ajax spinner
			},
			success: function (result) {
				
				if(result =="ERRO") {
					navigator.notification.alert('O produto ja havia sido removido do seu pedido!', alertDismissed, 'Versatille', 'OK'); 
					$.mobile.changePage("#acao");
				}
				if(result =="OK") {
					navigator.notification.alert('O produto foi removido do seu pedido!', alertDismissed, 'Versatille', 'OK'); 
					$.mobile.changePage("#acao");
				}				
			},
			error: function (request,error) {
				// This callback function will trigger on unsuccessful action                
				navigator.notification.alert('Houve um erro ao enviar suas informações!', alertDismissed, 'Versatille', 'OK');
			}
			});			
		}
		
		
		function Comprar(tmp_codigo){
			
			$.ajax({url: 'http://www.useversatille.com.br/xml/ajax_carrinho_comprar.php',
			data: {id_prod : tmp_codigo, CPF: '44444444444'},
			type: 'post',                   
			async: 'true',
            dataType: 'text',
			beforeSend: function() {
			// This callback function will trigger before data is sent
			$.mobile.loading('show', {
				theme: "a",
				text: "Aguarde...",
				textonly: true,
				textVisible: true
			});
			},
			complete: function() {
				// This callback function will trigger on data sent/received complete
				$.mobile.loading('hide'); // This will hide ajax spinner
			},
			success: function (result) {
				if(result =="ERRO") {
					navigator.notification.alert('Houve um erro ao adicionar o produto!', alertDismissed, 'Versatille', 'OK'); 
					$.mobile.changePage("#main");
				}
				if(result =="JA EXISTE") {
					navigator.notification.alert('O produto ja foi adicionado ao seu pedido!', alertDismissed, 'Versatille', 'OK'); 
					$.mobile.changePage("#carrinho");
				}	
				if(result =="SEM ESTOQUE") {
					navigator.notification.alert('O produto nao esta mais disponível em nosso estoque!', alertDismissed, 'Versatille', 'OK'); 
					$.mobile.changePage("#main");
				}
				if(result =="OK") {
					//navigator.notification.alert('O produto foi adicionado ao seu pedido!', alertDismissed, 'Versatille', 'OK'); 
					$.mobile.changePage("#carrinho");
				}				
			},
			error: function (request,error) {
				// This callback function will trigger on unsuccessful action                
				navigator.notification.alert('Houve um erro ao enviar suas informações!', alertDismissed, 'Versatille', 'OK');
			}
			});
		}
		
		function Alterar(codigo_id, var_pro_cod, var_qtde){
			
			$.ajax({url: 'http://www.useversatille.com.br/xml/ajax_carrinho_alterar.php',
			data: {id : codigo_id, pro_cod : var_pro_cod, qtde: var_qtde},
			type: 'post',                   
			async: 'true',
            dataType: 'text',
			beforeSend: function() {
			// This callback function will trigger before data is sent
			$.mobile.loading('show', {
				theme: "a",
				text: "Aguarde...",
				textonly: true,
				textVisible: true
			});
			},
			complete: function() {
				// This callback function will trigger on data sent/received complete
				$.mobile.loading('hide'); // This will hide ajax spinner
			},
			success: function (result) {
				
				if(result =="ERRO") {
					navigator.notification.alert('Houve um erro ao atualizar a quantidade!', alertDismissed, 'Versatille', 'OK'); 
					$.mobile.changePage("#acao");
				}
				if(result =="SEM ESTOQUE") {
					navigator.notification.alert('O produto nao esta mais disponível em estoque!', alertDismissed, 'Versatille', 'OK'); 
					$.mobile.changePage("#acao");
				}
				if(result =="OK") {
					$.mobile.changePage("#acao");
				}				
			},
			error: function (request,error) {
				// This callback function will trigger on unsuccessful action                
				navigator.notification.alert('Houve um erro ao enviar suas informações!', alertDismissed, 'Versatille', 'OK');
			}
			});
		}
		
		//Funcoes do Phonegap
		var isPhoneGapReady = false;
		var isConnected = false;
		var isHighSpeed = false;
		var tipo_conexao = "";
		//$(document).ready(function(){
		document.addEventListener("deviceready", onDeviceReady, false);
		//});
		 
		function onDeviceReady() {
			isPhoneGapReady = true;
			// detect for network access
			networkDetection();
			// attach events for online and offline detection
			document.addEventListener("online", onOnline, false);
			document.addEventListener("offline", onOffline, false);
		}
		
		function networkDetection() {
			if (isPhoneGapReady) {
				
				
				var states = {};
				states[navigator.connection.UNKNOWN]  = 'Unknown connection';
				states[navigator.connection.ETHERNET] = 'Ethernet connection';
				states[navigator.connection.WIFI]     = 'WiFi connection';
				states[navigator.connection.CELL_2G]  = 'Cell 2G connection';
				states[navigator.connection.CELL_3G]  = 'Cell 3G connection';
				states[navigator.connection.CELL_4G]  = 'Cell 4G connection';
				states[navigator.connection.NONE]     = 'No network connection';
				var tipo_conexao = states[navigator.connection.type];
				
				if (tipo_conexao != 'No network connection') {
					isConnected = true;
				}
				
			}	
		}
		
		function onOnline() {
			isConnected = true;
		}
		function onOffline() {
			isConnected = false;
		}
		
		function ValidarNavegacao(){
			if (isPhoneGapReady){
				if (isConnected) {
					//Continuar
				} else {
					navigator.notification.alert('Não existe conexão com a Internet', alertDismissed, 'Versatille', 'OK');
					$.mobile.changePage("#main");
				}
			} else {
				navigator.notification.alert('O aplicativo não está pronto!', alertDismissed, 'Versatille', 'OK');
				$.mobile.changePage("#main");
			}
		}
		
		//Para as acoes do carrinho (excluir - alterar)
		$(document).on('pageshow', '#acao', function(){  
			$.mobile.changePage("#carrinho");
		});	
		
		
		$(document).on('pageshow', '#noticias', function(){  
			if (isConnected){
			//Noticias
			$.ajax({
				type: "GET",
				url: "http://www.useversatille.com.br/xml/xml_noticias2.php",
				dataType: "xml",
				success: function(data) {
					var conteudo = "";
					$(data).find('noticia').each(function(){
						var titulo =  $(this).find("titulo").text();
						var descricao =  $(this).find("descricao").text();
						
						conteudo = conteudo + '<div data-role="collapsible">';
						conteudo = conteudo + '<h3>' + titulo + '</h3>';
						conteudo = conteudo + '<p>' + descricao + '</p>';
						conteudo = conteudo + '</div>';
						
					});
					//alert(conteudo);
					$("#content_news").append(conteudo).collapsibleset().trigger('create');
					$('[data-role="main"]').trigger('create');

				}
			});
			} else {
				navigator.notification.alert('Nao existe conexao com a Internet', alertDismissed, 'Versatille', 'OK');
				$.mobile.changePage("#main");
			}
			
		});	
		
		$(document).on('pageinit', '#faleconosco', function(){  
        $(document).on('click', '#enviar_contato', function() { 
			// catch the form's submit event
			
			ValidarNavegacao();
		
			var field_tag_css = {
				"background-color": "#FFFF99"
			  };
			var continuar = true;
			var mensagem ="Ocorreram os seguintes erros:\n";
			
			if ($('#nome_contato').val() == "") {
				mensagem = mensagem + 'Prencha o seu nome\n';
				$('#nome_contato').css(field_tag_css);
				continuar = false;
			}

			if ($('#email_contato').val() == "") {
				mensagem = mensagem +  'Digite o endereco de e-mail\n';
				$('#email_contato').css(field_tag_css);
				continuar = false;
			} else {
				if (echeck($('#email_contato').val())==false){
				mensagem = mensagem + 'Preencha corretamente o endereco de e-mail\n';
				continuar = false;
				}
			}


			if ($('#mensagem_contato').val() == "") {
				mensagem = mensagem + 'Prencha a mensagem que deseja enviar\n';
				$('#mensagem_contato').css(field_tag_css);
				continuar = false;
			}
			
		
			if (continuar){
				// Send data to server through the ajax call
				// action is functionality we want to call and outputJSON is our data
				//formData : $('#check-contato').serialize()
					$.ajax({url: 'http://www.useversatille.com.br/xml/ajax_contato.php',
						data: {action : 'enviar', nome: $('#nome_contato').val(), email: $('#email_contato').val(), ddd_telefone: '00', numero_telefone: '00000000', mensagem: $('#mensagem_contato').val()},
						type: 'post',                   
						async: 'true',
                        dataType: 'text',
						beforeSend: function() {
							// This callback function will trigger before data is sent
							$.mobile.loading('show', {
								theme: "a",
								text: "Aguarde...",
								textonly: true,
								textVisible: true
							});
													},
						complete: function() {
							// This callback function will trigger on data sent/received complete
							$.mobile.loading('hide'); // This will hide ajax spinner
						},
						success: function (result) {
							
							if(result =="OK") {
								navigator.notification.alert('Obrigado por enviar sua mensagem!', alertDismissed, 'Versatille', 'OK'); 
								$.mobile.changePage("#index");							
							} else {
							    navigator.notification.alert('Erro ao gravar suas informacoes!', alertDismissed, 'Versatille', 'OK'); 
							}
						},
						error: function (request,error) {
							// This callback function will trigger on unsuccessful action                
							navigator.notification.alert('Houve um erro ao enviar suas informações!', alertDismissed, 'Versatille', 'OK');
						}
					});                   
			} else {
				navigator.notification.alert(mensagem,alertDismissed, 'Versatille', 'OK');
				//return false;
			}           
            return false; // cancel original event to prevent form submitting
        });    
		});
		
		$(document).on('pageshow', '#main', function(){
			
			var ver_banner = true;
			if (isPhoneGapReady){
				if (isConnected) {
					//Continuar
				} else {
					ver_banner = false;
				}				
			} else {
				ver_banner = false;
			}
			
			if (ver_banner){
				$.ajax({
					type: "GET",
					url: "http://www.useversatille.com.br/xml/xml_banners.php",
					dataType: "xml",
					success: function(data) {
						var conteudo = "";
						$(data).find('banners').each(function(){
							var link = $(this).find("link").text();
							var imagem = $(this).find("imagem").text();
							imagem = 'http://www.useversatille.com.br/' + imagem;
							
							conteudo = conteudo + '<div class="item">';
							if (link != "") {
								conteudo = conteudo + '<a href="http://www.useversatille.com.br/' + link + '">';
							}
						   
							conteudo = conteudo + '<img src="' + imagem + '">';
							if (link != "") {
								conteudo = conteudo + '</a>';
							}
							conteudo = conteudo + '</div>';
						});
						
						$("#owl-demo").html(conteudo);
						
						$("#owl-demo").owlCarousel({

							navigation : true,
							slideSpeed : 300,
							paginationSpeed : 600,
							singleItem : true,
							autoPlay: true,
							lazyLoad : true,
							transitionStyle : "backSlide",
							itemsMobile : true,
							itemsDesktopSmall : true
						});
					},
					error: function (request,error) {
						// This callback function will trigger on unsuccessful action                
						//navigator.notification.alert('Houve um erro ao buscar os banners no sistema!', alertDismissed, 'Versatille', 'OK');
					}
				});
			}
		});
		
		$(document).on('pageinit', '#tela1', function(){  
			ValidarNavegacao();
			
			$.ajax({
				type: "GET",
				url: "http://www.useversatille.com.br/xml/xml_produtos_novidades.php",
				dataType: "xml",
				success: function(data) {
					var conteudo = "<h2>Novidades!</h2>";
					conteudo = conteudo + '<div class="elements" data-filter="true" data-input="#divOfPs-input1">';
					$(data).find('produtos').each(function(){
						var codigo = $(this).find("pro_cod").text();
						var imagem = $(this).find("pro_imagem").text();
						var nome = $(this).find("pro_descricao").text();
						var valor = $(this).find("pro_valor").text();
						var valor_promo = $(this).find("pro_valor_promocao").text();
						imagem = 'http://www.useversatille.com.br/' + imagem;
					
						conteudo = conteudo + '<div class="produtos">';
						conteudo = conteudo + '<div class="produtos-images">';
						conteudo = conteudo + '	<a id = "' + codigo + '" data-parm="' + codigo + '" href="#" onclick="TrocarCodigo('+ codigo +')"><img src="' + imagem + '" width="200" height="200" class="img"></a>';		
						conteudo = conteudo + '</div>';
						conteudo = conteudo + '<div class="produtos-tit">' + nome + '</div>';
						if (valor_promo == ""){
							conteudo = conteudo + '<div class="valor"> Valor: R$ ' + valor + '</span></div>';
						} else {
							conteudo = conteudo + '<div class="produtos-preco">';
							conteudo = conteudo + '	<span class="preco-promo">De: R$ ' + valor + '</span>';
							conteudo = conteudo + '	<br>';
							conteudo = conteudo + '	Por: R$ ' + valor_promo;   
							conteudo = conteudo + '</div>';
						}
						conteudo = conteudo + '</div>';
					});
					conteudo = conteudo + '</div>';
					$("#main_tela1").html(conteudo);

				}
			});
		});		
			
		$(document).on('pageshow', '#tela2', function(){ 
			ValidarNavegacao();
			$('#loader_categorias').show();
			$.ajax({
				type: "GET",
				url: "http://www.useversatille.com.br/xml/xml_categorias.php",
				dataType: "xml",
				success: function(data) {
					var conteudo = "";
					$(data).find('categoria').each(function(){
						var codigo = $(this).find("codigo").text();
						var nome = $(this).find("descricao").text();
						
						categorias.push({
                        codigo: $(this).find("codigo").text(),
                        nome: $(this).find("descricao").text()
						});    
						
						conteudo = conteudo + '<li>';
						conteudo = conteudo + '<a href="#" onclick=TrocarCategoria(' + codigo + ')>';
						conteudo = conteudo + '<img src="img/icon_categoria.png" style="top:15px;left:20px;">';
						conteudo = conteudo + '<h2>' + nome + '</h2>';
						conteudo = conteudo + '</a>';
						conteudo = conteudo + '</li>';
					});
					$('#loader_categorias').hide();
					$('#lista_categorias').append(conteudo);
					$('#lista_categorias').trigger('create');    
					$('#lista_categorias').listview('refresh');

				}
			});
			
			
		});	
		
		$(document).on('pageshow', '#tela3', function(){  
			ValidarNavegacao();
			$.ajax({
				type: "GET",
				url: "http://www.useversatille.com.br/xml/xml_produtos.php?categoria=" + codigo_categoria,
				dataType: "xml",
				success: function(data) {
				
					var conteudo = "<h2>" + nome_categoria + "</h2>";
					conteudo = conteudo + '<div class="elements" data-filter="true" data-input="#divOfPs-input1">';
					$(data).find('produtos').each(function(){
						var codigo = $(this).find("pro_cod").text();
						var imagem = $(this).find("pro_imagem").text();
						var nome = $(this).find("pro_descricao").text();
						var valor = $(this).find("pro_valor").text();
						var valor_promo = $(this).find("pro_valor_promocao").text();
						
						//Criando um array com os resultados!
						resultados.push({
                        codigo: $(this).find("pro_cod").text(),
                        imagem: $(this).find("pro_imagem").text(),
                        nome: $(this).find("pro_descricao").text(),
                        valor: $(this).find("pro_valor").text(),
						valor_promo: $(this).find("pro_valor_promocao").text()
						});    
						
						imagem = 'http://www.useversatille.com.br/' + imagem;
					
						conteudo = conteudo + '<div class="produtos">';
						conteudo = conteudo + '<div class="produtos-images">';
						conteudo = conteudo + '	<a id = "' + codigo + '" data-parm="' + codigo + '" href="#" onclick="TrocarCodigo('+ codigo +')"><img src="' + imagem + '" width="200" height="200" class="img"></a>';		
						conteudo = conteudo + '</div>';
						conteudo = conteudo + '<div class="produtos-tit">' + nome + '</div>';
						if (valor_promo == ""){
							conteudo = conteudo + '<div class="valor"> Valor: R$ ' + valor + '</span></div>';
						} else {
							conteudo = conteudo + '<div class="produtos-preco">';
							conteudo = conteudo + '	<span class="preco-promo">De: R$ ' + valor + '</span>';
							conteudo = conteudo + '	<br>';
							conteudo = conteudo + '	Por: R$ ' + valor_promo;   
							conteudo = conteudo + '</div>';
						}
						conteudo = conteudo + '</div>';
						
						
						
					});
					
					
					
					conteudo = conteudo + '</div>';
					$("#main_tela3").html(conteudo);
					
					
					
				}
			});
		});	
		
		$(document).on('pageshow', '#tela4', function(){ 
			ValidarNavegacao();
			$("#main_tela4").html('<img src="img/ajax-loader.gif">');
			//Produto Selecionado
			$.ajax({
				type: "GET",
				url: "http://www.useversatille.com.br/xml/xml_produtos_detalhe.php?codigo=" + codigo_produto,
				dataType: "xml",
				success: function(data) {
					var conteudo_fotos = "";
					var possui_fotos = 0;
					var conteudo = '<header class="titulos"><span style="color:#333">Detalhes do </span>produto</header>';
					$(data).find('produto').each(function(){
						var codigo = $(this).find("pro_cod").text();
						var imagem = $(this).find("pro_imagem").text();
						var nome = $(this).find("pro_descricao").text();
						var valor = $(this).find("pro_valor").text();
						var valor_promo = $(this).find("pro_valor_promocao").text();
						var detalhes = $(this).find("pro_espec").text();
						imagem = 'http://www.useversatille.com.br/' + imagem;
											
						conteudo = conteudo + '<section class="prodtotal">';    
						conteudo = conteudo + '<div id="imgprod"><img src="' + imagem + '" class="img"></a></div>';
						conteudo = conteudo + '</section>';
						conteudo = conteudo + '<div class="buyprod">';
						conteudo = conteudo + '	<header class="titprod">' + nome + '</header>';
						if (valor_promo == ""){
							conteudo = conteudo + '	<div class="valor"> Valor: <span style="color:#e86c6e">R$ ' + valor + '</span></div>';
						} else {
							conteudo = conteudo + '	<div class="produtos-preco">';
							conteudo = conteudo + '<span class="preco-promo">De: R$ ' + valor + '</span>';
							conteudo = conteudo + '<br>Por: R$ ' + valor_promo + '</div>';
							conteudo = conteudo + '</div>';
						}
						conteudo = conteudo + '<div id="descricao">';
						conteudo = conteudo + '	<div class="titulos"><span style="color:#333">Detalhes</span></div>';
						conteudo = conteudo + '	<div class="descprod">';
						conteudo = conteudo + '		<p>' + detalhes + '</p>';
						
						conteudo = conteudo + '	</div>';
						conteudo = conteudo + '</div>';
						
						conteudo = conteudo + '<p><a href="#" onclick="Comprar(' + codigo +' )">* Adicionar Produto *</a></p>';
						
						//Carregando a galeria de imagens
						$(data).find('foto').each(function(){
							var imagem = $(this).find("thumb").text();
							imagem = 'http://www.useversatille.com.br/' + imagem;
							conteudo_fotos = conteudo_fotos + '<div class="item">';
                            conteudo_fotos = conteudo_fotos + '<img src="' + imagem + '">';
							conteudo_fotos = conteudo_fotos + '</div>';
							possui_fotos = 1;
						});
						
						if (possui_fotos == 1){
							conteudo = conteudo + '<div class="container">';
							conteudo = conteudo + '<div id="owl-demo2" class="owl-carousel">';
							conteudo = conteudo + conteudo_fotos;
							conteudo = conteudo + '</div>';
							conteudo = conteudo + '</div>'; 
						}
									
					});
				
					$("#main_tela4").html(conteudo).trigger('create');
					if (possui_fotos == 1){
						$("#owl-demo2").owlCarousel({
							items : 4,
							navigation : true,
							autoPlay: true,
							lazyLoad : true,
							itemsMobile : true,
							itemsDesktopSmall : true,
							itemsDesktop : true
						});
					}

				},
				error: function (request,error) {
					//navigator.notification.alert('Houve um erro ao buscar as informações deste produto!', alertDismissed, Versatille', 'OK');
				}
			});
		});	
						
		$(document).on('pageshow', '#tela11', function(){
			ValidarNavegacao();
			//https://github.com/commadelimited/autoComplete.js
			$("#searchField").autocomplete({
				icon: 'arrow-r',
				target: $('#suggestions'),
				source: 'http://www.useversatille.com.br/xml/json_produtos_busca.php',
				minLength: 3,
				loadingHtml : '<li data-icon="none"><a href="#">Pesquisando...</a></li>',
				callback: function(e){
                    var $a = $(e.currentTarget); // access the selected item
					TrocarCodigo($a.attr('href').substr(4));
				}
			});
		});
		
		
		$(document).on('pageshow', '#carrinho', function(){
			ValidarNavegacao();			
			$("#main_carrinho").html('');
			
			$.ajax({
				type: "GET",
				url: "http://www.useversatille.com.br/xml/xml_carrinho.php?CPF=44444444444",
				dataType: "xml",
				success: function(data) {
					
					var conteudo = '<header class="titulos"><span style="color:#333">Meu Pedido</header>';
					conteudo = conteudo + '<table width="100%" border="0" class="tabela">';
					conteudo = conteudo + '<tr bgcolor="#f6c401" height="37">';
					conteudo = conteudo + '<th width="8%" >Excluir</th>';
					conteudo = conteudo + '<th width="42%">Produto</th>';
					conteudo = conteudo + '<th width="15%">Qtd</th>';
					conteudo = conteudo + '<th width="15%">[+] [-]</th>';
					conteudo = conteudo + '<th width = "15%">Valor</th>';
					conteudo = conteudo + '<th width="15%">Total</th>';
					conteudo = conteudo + '</tr>';
					var tmp_contador = $(data).find('produtos').length;
					$(data).find('produtos').each(function(){
						//tmp_contador++;
						var codigo = $(this).find("pro_cod").text();
						var imagem = $(this).find("pro_imagem").text();
						var nome = $(this).find("pro_descricao").text();
						var valor = $(this).find("pro_valor").text();
						var quantidade = $(this).find("quantidade").text();
						var total = $(this).find("total").text();
						var id_carrinho = $(this).find("id_carrinho").text();
						imagem = 'http://www.useversatille.com.br/' + imagem;
						
						conteudo = conteudo + '<tr>';
						conteudo = conteudo + '<td><a href="#"  data-role="button" data-icon="delete" data-iconpos="notext" onclick="Remover(' + id_carrinho + ')">Excluir</a></td>';
						conteudo = conteudo + '<td>' + nome + '</td>';
						conteudo = conteudo + '<td>' + quantidade + '</td>';
						conteudo = conteudo + '<td>';
						
						var tmp_qtde1 = Math.abs(quantidade) + 1;
						var tmp_qtde2 = Math.abs(quantidade) - 1;
						
						conteudo = conteudo + '<a href="#" data-role="button"  data-icon="plus" data-iconpos="notext" onclick="Alterar(' + id_carrinho + ',' + codigo + ',' + tmp_qtde1 + ')" > [ + ] </a> ';
						
						if (Math.abs(quantidade) > 1){
						
						conteudo = conteudo + '<a href="#" data-role="button"  data-icon="minus" data-iconpos="notext" onclick="Alterar(' + id_carrinho + ',' + codigo + ',' + tmp_qtde2 + ')"  data-role="button" data-theme="b"> [ - ] </a> ';
						
						}
						
						
						
						conteudo = conteudo + '</td>';
						conteudo = conteudo + '<td>' + valor + '</td>';
						conteudo = conteudo + '<td>' + total + '</td>';
						conteudo = conteudo + '</tr>';
						
					});
					if (tmp_contador == 0){
						conteudo = conteudo + '<tr><td colspan="5" align="center">Nao existem produtos selecionados</td></tr>';
					}
					conteudo = conteudo + '</table>';
					conteudo = conteudo + '<p></p>';
					if (Math.abs(tmp_contador) > 0){
						conteudo = conteudo + '<p><a href="#" onclick="Finalizar()"  data-role="button" data-icon="check">Finalizar Pedido</a></p>';
					}
					
					$("#main_carrinho").html(conteudo).trigger('create');

				},
				error: function (request,error) {
					// This callback function will trigger on unsuccessful action                
					navigator.notification.alert('Houve um erro ao buscar as informações do seu pedido!', alertDismissed, 'Versatille', 'OK');
				}
			});
		});	
		
