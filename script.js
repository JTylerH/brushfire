$(document).ready(function() {
    
    var onPollPane = false;
    
    $('.sc-gFSPHw.gqvlNk.video-panel').attr('id','WAVEID');
    
    //removed because of issues
    $('#toggle-video-panel').remove();
    
    //add our custom toggle button
    $('#toggle-chat').after('<div id="TOGGLEWAVEPOLL" class="sc-clIAKW hKSAsZ panel-button" color="#ffffff" style="display:block;text-align:center;"><i style="display:block;margin-top:6px;" class="fas fa-poll" aria-hidden="true" style="font-size: 28px;"></i><small style="display:block;line-height:.9em;font-weight:900;">QA & Polls</small></div>');
    //position the iframe inside the pane and give it a z-index of at least 2 and not more than 10 to hide other panels
    $('#WAVEID>.video-panel-content').prepend('<div id="WAVEPOLL" style="position:absolute;top:0;left:0;bottom:0;right:0;overflow:hidden;display:none;z-index:2;"><iframe id="slido" frameBorder="0" style="width:100%;height:calc(100% + 51px);margin-top:-50px;" src="https://app.sli.do/event/wmmorx08"></iframe></div>');
    //add it to mobile menu too
    $('#WAVEID>.sc-hlGCtx.FjAuF>div>div:first-child>div:nth-child(2)').after('<div id="TOGGLEWAVEPOLLMOBILE" class="sc-clIAKW ivocmh sc-dYPeNj jNTGZK"><span class="icon-wrapper"><i class="fal fa-comment-alt-exclamation" aria-hidden="true"></i></span>Q&A and Polling</div>')
    
    //screen resizing removes custom toggle button, re-add on resize if it doesn't exist
    $(window).on('resize', function(){
        var win = $(this); //this = window
        if(!$('#TOGGLEWAVEPOLL').length){
            if (win.width() >= 993) {
                $('#toggle-chat').after('<div id="TOGGLEWAVEPOLL" class="sc-clIAKW hKSAsZ panel-button" color="#ffffff"><i class="fal fa-poll" aria-hidden="true" style="font-size: 28px;"></i></div>');
                customToggleBind();
                $('#toggle-interactions').remove();
                if(!onPollPane){
                    $('#WAVEPOLL').hide();
                }else{
                    $('#TOGGLEWAVEPOLL').trigger('click');
                }
            }
        }
        if(!$('#TOGGLEWAVEPOLLMOBILE').length){
            if (win.width() <= 992) {
                $('#WAVEID>.sc-hlGCtx.FjAuF>div>div>div:nth-child(2)').after('<div id="TOGGLEWAVEPOLLMOBILE" class="sc-clIAKW ivocmh sc-dYPeNj jNTGZK"><span class="icon-wrapper"><i class="fal fa-comment-alt-exclamation" aria-hidden="true"></i></span>Q&A and Polling</div>');
                customToggleBindMobile();
                $('.mobile-panel-bar .sc-clIAKW.ivocmh.sc-kTqMCK.cByDxl').removeClass('has-activity');
                if($('#WAVEID>.sc-hlGCtx.FjAuF>div>div:first-child>div:last-child').text() == "Interactions"){
                    $('#WAVEID>.sc-hlGCtx.FjAuF>div>div:first-child>div:last-child').remove();
                }
                if(!onPollPane){
                    $('#WAVEPOLL').hide();
                }
            }
        }
        if (win.width() >= 790 && win.width() <= 992) {
            $('#WAVEPOLL>iframe').css({"margin-top":"0","height":"100%"});
        }else{
            $('#WAVEPOLL>iframe').css({"margin-top":"-50px","height":"calc(100% + 51px)"});
        }
    });
    
    customToggleBind();
    customToggleBindMobile();
    
    //putting in function to reuse and bind on resize
    function customToggleBind(){
        //making the custom toggle buttons work with the native toggle buttons
        $('.panel-button-container>div').on('click',function(){
            console.log($(this).attr('id'));
            if($(this).attr('id') == "TOGGLEWAVEPOLL"){
                $('.panel-button-container>div').each(function(){
                    if($(this).hasClass('kpoarI')){
                        $(this).removeClass('kpoarI').attr('color','#ffffff').addClass('hKSAsZ');
                    }
                });
                $('#WAVEPOLL').show();
                $('#TOGGLEWAVEPOLL').addClass('kpoarI').removeClass('hKSAsZ');
                onPollPane = true;
                //make the poll toggle work with the info toggle too
                if($('#toggle-info').hasClass('kpoarI')){
                    $('#toggle-info').removeClass('kpoarI').attr('color','#ffffff').addClass('hKSAsZ');
                }
                $('#toggle-interactions').on('click',function(){
                    if(onPollPane){
                        $('#toggle-bible').trigger('click');
                        $('#toggle-interactions').trigger('click');
                    }
                });
            }else{
                $(this).addClass('kpoarI').attr('color','#ffffff').removeClass('hKSAsZ');
                $('#WAVEPOLL').hide();
                $('#TOGGLEWAVEPOLL').addClass('hKSAsZ').removeClass('kpoarI has-activity');
                onPollPane = false;
            }
        });
        //make the poll toggle work with the info toggle too
        $('#toggle-info').on('click',function(){
            $('#WAVEPOLL').hide();
            $('#TOGGLEWAVEPOLL').addClass('hKSAsZ').removeClass('kpoarI has-activity');
            onPollPane = false;
        });
    }
    
    //putting in function to reuse and bind on resize
    function customToggleBindMobile(){ 
        //making the custom toggle buttons work with the native toggle buttons
        $('#WAVEID>.sc-hlGCtx.FjAuF>div>div>div').on('click',function(){
            if($(this).attr('id') == "TOGGLEWAVEPOLLMOBILE"){
                $('.mobile-panel-bar .sc-clIAKW.ivocmh.sc-kTqMCK.cByDxl').trigger('click');
                $('#WAVEPOLL').show();
                $('#TOGGLEWAVEPOLL').addClass('kpoarI').removeClass('hKSAsZ');
                onPollPane = true;
            }else{
                $('#WAVEPOLL').hide();
                $('#TOGGLEWAVEPOLL').addClass('hKSAsZ').removeClass('kpoarI');
                onPollPane = false;
            }
            $('#WAVEID>.sc-hlGCtx.FjAuF>div>div>div').each(function(){
            });
        });
    }
    
    //observe when the native interaction tab and pane is fired off so we can use send in host panel to pop up our custom toggle pane
    const observer = new MutationObserver(function(mutations_list) {
    	mutations_list.forEach(function(mutation) {
    		mutation.addedNodes.forEach(function(node) {
		        if(node.id == 'interactions-container') {
		      //      onPollPane = true;
    				// console.log('#interactions-container has been added');
    				// //trigger another toggle before deleting toggle and pane to avoid black screens
    				// $('#toggle-chat').trigger('click');
    				// // do it for mobile too
    				// $('#WAVEID>.sc-hlGCtx.FjAuF>div>div>div:nth-child(2)').trigger('click');
    				// //open the our custom pane by triggering a click on the custom tab
    				// $('#TOGGLEWAVEPOLL').trigger('click');
    		  //      //do it for mobile too
    				// $('#TOGGLEWAVEPOLLMOBILE').trigger('click');
    				// //mobile trigger opens the menu, lets close it
    				// $('.mobile-panel-bar .sc-clIAKW.ivocmh.sc-kTqMCK.cByDxl').trigger('click');
    				// //delete the interaction toggle and pane whenever it appears
    				// $('#toggle-interactions').remove();
    				// $('#interactions-container').remove();
    				// // delete it for mobile
    				// $('#WAVEID>.sc-hlGCtx.FjAuF>div>div>div:last-child').remove();
    				// //give the toggle has-activity class
    				// $('#TOGGLEWAVEPOLL').addClass('has-activity');
    				// $('#TOGGLEWAVEPOLLMOBILE>span').addClass('has-activity');
    				$('#WAVEPOLL').hide();
                    $('#TOGGLEWAVEPOLL').addClass('hKSAsZ').removeClass('kpoarI has-activity');
                    onPollPane = false;
    			}
    		});
    	});
    });
    observer.observe(document.querySelector("#WAVEID>.video-panel-content"), { subtree: true, childList: true });
    
    
    //navigation open poll
    $('.nav-container .menu').append('<a id="TOPNAVOPENPOLL" class="sc-fmWevp jMeVdN"><i class="fas fa-poll" aria-hidden="true" style="margin-right: 5px;"></i><span>Open Live Poll</span></a>');
    $('#TOPNAVOPENPOLL').on('click', function(){
        $('#TOGGLEWAVEPOLL').trigger('click');
    });
    
    $('.nav-container .drawer-menu').append('<a id="DRAWERNAVOPENPOLL" class="sc-jdhxzS pOouR"><h2><i class="fas fa-poll" aria-hidden="true" style="margin-right: 5px;"></i> Open Live Poll</h2></a>');
    $('#DRAWERNAVOPENPOLL').on('click', function(){
        $('#TOGGLEWAVEPOLL').trigger('click');
    });
    //below video open poll
    $('.video-links-desktop').prepend('<a id="VIDEOOPENPOLL" class="sc-eBTqMF ijVDwC"><i class="fas fa-poll link-icon" aria-hidden="true" style="margin-right: 5px;"></i><p class="" style="margin-top: 0px; margin-bottom: 0px;">Q&amp;A AND POLLS</p></a>');
    $('#VIDEOOPENPOLL').on('click', function(){
        $('#TOGGLEWAVEPOLL').trigger('click');
    });
    
    //delete register (first-child) link for viewers
    $('.nav-container .menu>a:first-child').remove();
    $('.nav-container .drawer-menu>a:first-child').remove();
    
    
});
