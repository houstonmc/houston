(function(){return this.HandlebarsTemplates||(this.HandlebarsTemplates={}),this.HandlebarsTemplates["houston/feedback/comments/delete_imported"]=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="modal hide">\n  <div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n    <h3>Delete all imported comments?</h3>\n  </div>\n  <div class="modal-body">\n    <p>It looks like these comments were imported together.</p>\n    <p>Do you want to delete all of them?</p>\n  </div>\n  <div class="modal-footer">\n    <button type="button" class="btn btn-danger" id="delete_selected">Delete the selected comments</button>\n    <button type="button" class="btn btn-danger" id="delete_imported">Delete all the comments imported with them</button>\n  </div>\n</div>'},useData:!0}),this.HandlebarsTemplates["houston/feedback/comments/delete_imported"]}).call(this),function(){return this.HandlebarsTemplates||(this.HandlebarsTemplates={}),this.HandlebarsTemplates["houston/feedback/comments/edit"]=Handlebars.template({1:function(e,t,n,a){var s,o="function",l=t.helperMissing,r=this.escapeExpression;return'    <h3 class="feedback-customer">'+r((s=null!=(s=t.customer||(null!=e?e.customer:e))?s:l,typeof s===o?s.call(e,{name:"customer",hash:{},data:a}):s))+"</h3>\n"},3:function(e){var t,n=this.lambda,a=this.escapeExpression;return'    <h3 class="feedback-customer unknown">'+a(n(null!=(t=null!=e?e.reporter:e)?t.name:t,e))+"</h3>\n"},5:function(e){var t=this.lambda,n=this.escapeExpression;return'<span class="feedback-tag">\n        '+n(t(e,e))+'\n        <a class="feedback-remove-tag"><i class="fa fa-close"></i></a>\n      </span>'},compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,n,a){var s,o,l="function",r=t.helperMissing,i=this.escapeExpression,c=this.lambda,d='<div id="comment_'+i((o=null!=(o=t.id||(null!=e?e.id:e))?o:r,typeof o===l?o.call(e,{name:"id",hash:{},data:a}):o))+'" class="feedback-comment feedback-edit-comment" data-id="'+i((o=null!=(o=t.id||(null!=e?e.id:e))?o:r,typeof o===l?o.call(e,{name:"id",hash:{},data:a}):o))+'">\n  <a href="#" class="feedback-comment-close"><i class="fa fa-times" /></a>\n  \n  ';return s=(t.avatar||e&&e.avatar||r).call(e,null!=(s=null!=e?e.reporter:e)?s.email:s,24,null!=(s=null!=e?e.reporter:e)?s.name:s,{name:"avatar",hash:{},data:a}),null!=s&&(d+=s),d+="\n  \n",s=t["if"].call(e,null!=e?e.customer:e,{name:"if",hash:{},fn:this.program(1,a),inverse:this.program(3,a),data:a}),null!=s&&(d+=s),d+='  \n  <div class="feedback-metadata">\n    <span class="feedback-reporter">'+i(c(null!=(s=null!=e?e.reporter:e)?s.name:s,e))+'</span>\n    <span class="feedback-created date">',s=(t.formatDateWithYear2||e&&e.formatDateWithYear2||r).call(e,null!=e?e.createdAt:e,{name:"formatDateWithYear2",hash:{},data:a}),null!=s&&(d+=s),d+='</span>\n  </div>\n  \n  <div class="feedback-tags">\n    <div class="feedback-tag-list">\n      ',s=t.each.call(e,null!=e?e.tags:e,{name:"each",hash:{},fn:this.program(5,a),inverse:this.noop,data:a}),null!=s&&(d+=s),d+='\n    </div>\n    <input type="text" class="feedback-new-tag" placeholder="New Tag" />\n  </div>\n  \n  <div class="feedback-text markdown">',s=(t.markdown||e&&e.markdown||r).call(e,null!=e?e.text:e,{name:"markdown",hash:{},data:a}),null!=s&&(d+=s),d+'</div>\n  \n  <button class="btn btn-delete btn-small btn-danger">Delete</button>\n</div>'},useData:!0}),this.HandlebarsTemplates["houston/feedback/comments/edit"]}.call(this),function(){return this.HandlebarsTemplates||(this.HandlebarsTemplates={}),this.HandlebarsTemplates["houston/feedback/comments/edit_multiple"]=Handlebars.template({1:function(e,t,n,a){var s,o="function",l=t.helperMissing,r=this.escapeExpression;return'        <span class="feedback-tag" style="background: rgba(170, 170, 170, '+r((s=null!=(s=t.percent||(null!=e?e.percent:e))?s:l,typeof s===o?s.call(e,{name:"percent",hash:{},data:a}):s))+')">\n          '+r((s=null!=(s=t.name||(null!=e?e.name:e))?s:l,typeof s===o?s.call(e,{name:"name",hash:{},data:a}):s))+'\n          <a class="feedback-remove-tag"><i class="fa fa-close"></i></a>\n        </span>\n'},compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,n,a){var s,o,l="function",r=t.helperMissing,i=this.escapeExpression,c='<div class="feedback-comment feedback-edit-comment feedback-edit-multiple">\n  <a href="#" class="feedback-comment-close"><i class="fa fa-times" /></a>\n  \n  <h3>'+i((o=null!=(o=t.count||(null!=e?e.count:e))?o:r,typeof o===l?o.call(e,{name:"count",hash:{},data:a}):o))+' selected comments</h3>\n  \n  <div class="feedback-tags">\n    <div class="feedback-tag-list">\n';return s=t.each.call(e,null!=e?e.tags:e,{name:"each",hash:{},fn:this.program(1,a),inverse:this.noop,data:a}),null!=s&&(c+=s),c+'    </div>\n    <input type="text" class="feedback-new-tag" placeholder="New Tag" />\n  </div>\n  \n  <button class="btn btn-delete btn-small btn-danger">Delete</button>\n</div>'},useData:!0}),this.HandlebarsTemplates["houston/feedback/comments/edit_multiple"]}.call(this),function(){return this.HandlebarsTemplates||(this.HandlebarsTemplates={}),this.HandlebarsTemplates["houston/feedback/comments/import"]=Handlebars.template({1:function(e,t,n,a){var s,o="function",l=t.helperMissing,r=this.escapeExpression;return'            <label for="customer_field_'+r((s=null!=(s=t.index||(null!=e?e.index:e))?s:l,typeof s===o?s.call(e,{name:"index",hash:{},data:a}):s))+'" class="csv-field">\n              <input type="checkbox" id="customer_field_'+r((s=null!=(s=t.index||(null!=e?e.index:e))?s:l,typeof s===o?s.call(e,{name:"index",hash:{},data:a}):s))+'" name="customer_fields[]" value="'+r((s=null!=(s=t.index||(null!=e?e.index:e))?s:l,typeof s===o?s.call(e,{name:"index",hash:{},data:a}):s))+'" />\n              '+r((s=null!=(s=t.text||(null!=e?e.text:e))?s:l,typeof s===o?s.call(e,{name:"text",hash:{},data:a}):s))+'\n              <span class="example">(e.g. '+r((s=null!=(s=t.example||(null!=e?e.example:e))?s:l,typeof s===o?s.call(e,{name:"example",hash:{},data:a}):s))+")</span>\n            </label>\n"},3:function(e,t,n,a){var s,o="function",l=t.helperMissing,r=this.escapeExpression;return'            <label for="feedback_field_'+r((s=null!=(s=t.index||(null!=e?e.index:e))?s:l,typeof s===o?s.call(e,{name:"index",hash:{},data:a}):s))+'" class="csv-field">\n              <input type="checkbox" id="feedback_field_'+r((s=null!=(s=t.index||(null!=e?e.index:e))?s:l,typeof s===o?s.call(e,{name:"index",hash:{},data:a}):s))+'" name="feedback_fields[]" value="'+r((s=null!=(s=t.index||(null!=e?e.index:e))?s:l,typeof s===o?s.call(e,{name:"index",hash:{},data:a}):s))+'" />\n              '+r((s=null!=(s=t.text||(null!=e?e.text:e))?s:l,typeof s===o?s.call(e,{name:"text",hash:{},data:a}):s))+'\n              <span class="example">(e.g. '+r((s=null!=(s=t.example||(null!=e?e.example:e))?s:l,typeof s===o?s.call(e,{name:"example",hash:{},data:a}):s))+")</span>\n            </label>\n"},compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,n,a){var s,o,l="function",r=t.helperMissing,i=this.escapeExpression,c='<div id="feedback_csv_import_modal" class="modal hide">\n  <div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n    <h3>Import '+i((o=null!=(o=t.filename||(null!=e?e.filename:e))?o:r,typeof o===l?o.call(e,{name:"filename",hash:{},data:a}):o))+'</h3>\n  </div>\n  <div class="modal-body">\n    <div class="instructions row-fluid">\n      <div class="span6"><div class="csv-fields">Select the fields that identify the customer</div></div>\n      <div class="span6"><div class="csv-fields">Select the fields that contain feedback to import</div></div>\n    </div>\n    <form class="row-fluid">\n      <div class="span6">\n        <div class="csv-fields">\n';return s=t.each.call(e,null!=e?e.headings:e,{name:"each",hash:{},fn:this.program(1,a),inverse:this.noop,data:a}),null!=s&&(c+=s),c+='        </div>\n      </div>\n      \n      <div class="span6">\n        <div class="csv-fields">\n',s=t.each.call(e,null!=e?e.headings:e,{name:"each",hash:{},fn:this.program(3,a),inverse:this.noop,data:a}),null!=s&&(c+=s),c+'        </div>\n      </div>\n    </form>\n  </div>\n  <div class="modal-footer">\n    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>\n    <button type="button" id="import_button" class="btn btn-primary">Import</button>\n  </div>\n</div>'},useData:!0}),this.HandlebarsTemplates["houston/feedback/comments/import"]}.call(this),function(){return this.HandlebarsTemplates||(this.HandlebarsTemplates={}),this.HandlebarsTemplates["houston/feedback/comments/index"]=Handlebars.template({1:function(e,t,n,a){var s,o,l="function",r=t.helperMissing,i=this.escapeExpression,c='<div id="comment_'+i((o=null!=(o=t.id||(null!=e?e.id:e))?o:r,typeof o===l?o.call(e,{name:"id",hash:{},data:a}):o))+'" tabindex="0" class="feedback-comment feedback-search-result" data-id="'+i((o=null!=(o=t.id||(null!=e?e.id:e))?o:r,typeof o===l?o.call(e,{name:"id",hash:{},data:a}):o))+'" data-rank="'+i((o=null!=(o=t.rank||(null!=e?e.rank:e))?o:r,typeof o===l?o.call(e,{name:"rank",hash:{},data:a}):o))+'">\n  <div class="feedback-snippet">\n';return s=t["if"].call(e,null!=e?e.customer:e,{name:"if",hash:{},fn:this.program(2,a),inverse:this.program(4,a),data:a}),null!=s&&(c+=s),c+='    <div class="feedback-metadata">\n      <span class="feedback-reporter">',s=(t.avatar||e&&e.avatar||r).call(e,null!=(s=null!=e?e.reporter:e)?s.email:s,16,null!=(s=null!=e?e.reporter:e)?s.name:s,{name:"avatar",hash:{},data:a}),null!=s&&(c+=s),c+='</span>\n      <span class="feedback-created date">',s=(t.formatDateWithYear2||e&&e.formatDateWithYear2||r).call(e,null!=e?e.createdAt:e,{name:"formatDateWithYear2",hash:{},data:a}),null!=s&&(c+=s),c+='</span>\n    </div>\n    <div class="feedback-text">',o=null!=(o=t.excerpt||(null!=e?e.excerpt:e))?o:r,s=typeof o===l?o.call(e,{name:"excerpt",hash:{},data:a}):o,null!=s&&(c+=s),c+='</div>\n  </div>\n  <div class="feedback-tag-list">\n    ',s=t.each.call(e,null!=e?e.tags:e,{name:"each",hash:{},fn:this.program(6,a),inverse:this.noop,data:a}),null!=s&&(c+=s),c+"\n  </div>\n</div>\n"},2:function(e,t,n,a){var s,o="function",l=t.helperMissing,r=this.escapeExpression;return'      <span class="feedback-customer">'+r((s=null!=(s=t.customer||(null!=e?e.customer:e))?s:l,typeof s===o?s.call(e,{name:"customer",hash:{},data:a}):s))+"</span>\n"},4:function(e){var t,n=this.lambda,a=this.escapeExpression;return'      <span class="feedback-customer unknown">'+a(n(null!=(t=null!=e?e.reporter:e)?t.name:t,e))+"</span>\n"},6:function(e){var t=this.lambda,n=this.escapeExpression;return'<span class="feedback-tag">'+n(t(e,e))+"</span>"},compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,n,a){var s;return s=t.each.call(e,null!=e?e.comments:e,{name:"each",hash:{},fn:this.program(1,a),inverse:this.noop,data:a}),null!=s?s:""},useData:!0}),this.HandlebarsTemplates["houston/feedback/comments/index"]}.call(this),function(){return this.HandlebarsTemplates||(this.HandlebarsTemplates={}),this.HandlebarsTemplates["houston/feedback/comments/new"]=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div id="new_feedback_modal" class="modal hide">\n  <div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n    <h3>New Comment</h3>\n  </div>\n  <div class="modal-body">\n    <form>\n      <label for="new_feedback_customer">Customer</label>\n      <input type="text" id="new_feedback_customer" name="customer" />\n      \n      <label for="new_feedback_text">Text</label>\n      <textarea id="new_feedback_text" name="text"></textarea>\n      \n      <label for="new_feedback_tags">Tags</label>\n      <div class="feedback-tags">\n        <div class="feedback-tag-list"></div>\n        <input type="text" id="new_feedback_tags" class="feedback-new-tag" placeholder="New Tag" />\n      </div>\n    </form>\n  </div>\n  <div class="modal-footer">\n    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>\n    <button type="button" id="create_button" class="btn btn-primary">Submit</button>\n  </div>\n</div>'},useData:!0}),this.HandlebarsTemplates["houston/feedback/comments/new"]}.call(this),function(){return this.HandlebarsTemplates||(this.HandlebarsTemplates={}),this.HandlebarsTemplates["houston/feedback/comments/report"]=Handlebars.template({1:function(e,t,n,a){var s,o="function",l=t.helperMissing,r=this.escapeExpression;return'in <span class="feedback-search-quantity"><span class="count">'+r((s=null!=(s=t.searchTime||(null!=e?e.searchTime:e))?s:l,typeof s===o?s.call(e,{name:"searchTime",hash:{},data:a}):s))+"</span> milliseconds</span>\n"},compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,n,a){var s,o,l="function",r=t.helperMissing,i=this.escapeExpression,c='Found <span class="feedback-search-quantity"><span class="count">'+i((o=null!=(o=t.results||(null!=e?e.results:e))?o:r,typeof o===l?o.call(e,{name:"results",hash:{},data:a}):o))+"</span> comments</span>\n";return s=t["if"].call(e,null!=e?e.searchTime:e,{name:"if",hash:{},fn:this.program(1,a),inverse:this.noop,data:a}),null!=s&&(c+=s),c},useData:!0}),this.HandlebarsTemplates["houston/feedback/comments/report"]}.call(this),function(){Houston.Feedback=Houston.Feedback||{}}.call(this),function(){$.fn.extend({between:function(e,t){var n,a,s;return n=$(this),a=n.index(e),s=n.index(t),s>=a?this.slice(a,s+1):this.slice(s,a+1)}})}.call(this),function(){var e={}.hasOwnProperty,t=function(t,n){function a(){this.constructor=t}for(var s in n)e.call(n,s)&&(t[s]=n[s]);return a.prototype=n.prototype,t.prototype=new a,t.__super__=n.prototype,t};Houston.Feedback.Comment=function(e){function n(){return n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.urlRoot="/feedback/comments",n.prototype.addTags=function(e){return this.set("tags",_.union(this.get("tags"),e).sort(),{silent:!0})},n.prototype.removeTags=function(e){return this.set("tags",_.difference(this.get("tags"),e).sort(),{silent:!0})},n}(Backbone.Model),Houston.Feedback.Comments=function(e){function n(){return n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.model=Houston.Feedback.Comment,n}(Backbone.Collection)}.call(this),function(){var e,t={}.hasOwnProperty,n=function(e,n){function a(){this.constructor=e}for(var s in n)t.call(n,s)&&(e[s]=n[s]);return a.prototype=n.prototype,e.prototype=new a,e.__super__=n.prototype,e};e={TAB:9,RETURN:13,ESC:27,UP:38,DOWN:40},Houston.Feedback.CommentsView=function(t){function a(){return a.__super__.constructor.apply(this,arguments)}return n(a,t),a.prototype.template=HandlebarsTemplates["houston/feedback/comments/index"],a.prototype.renderEditComment=HandlebarsTemplates["houston/feedback/comments/edit"],a.prototype.renderEditMultiple=HandlebarsTemplates["houston/feedback/comments/edit_multiple"],a.prototype.renderSearchReport=HandlebarsTemplates["houston/feedback/comments/report"],a.prototype.renderImportModal=HandlebarsTemplates["houston/feedback/comments/import"],a.prototype.renderDeleteImportedModal=HandlebarsTemplates["houston/feedback/comments/delete_imported"],a.prototype.renderNewCommentModal=HandlebarsTemplates["houston/feedback/comments/new"],a.prototype.events={"submit #search_feedback":"search","focus .feedback-search-result":"resultFocused","mousedown .feedback-search-result":"resultClicked","mouseup .feedback-search-result":"resultReleased",keydown:"keydown","click .feedback-comment-close":"selectNone","click .feedback-remove-tag":"removeTag","keydown .feedback-new-tag":"keydownNewTag","click .btn-delete":"deleteComments"},a.prototype.initialize=function(){return this.$results=this.$el.find("#results"),this.comments=this.options.comments,$("#import_csv_field").change(function(e){return $(e.target).closest("form").submit(),$(e.target).val("").attr("type","text").attr("type","file")}),$("#feedback_csv_upload_target").on("upload:complete",function(e){return function(t,n){return e.promptToImportCsv(n)}}(this)),$("#new_feedback_button").click(function(e){return function(){return e.newFeedback()}}(this)),this.options.infiniteScroll?new InfiniteScroll({load:function(e){return function(){var t,n;return n=new $.Deferred,e.offset+=50,n.resolve(e.template({comments:function(){var e,n,a,s;for(a=this.comments.slice(this.offset,this.offset+50),s=[],e=0,n=a.length;n>e;e++)t=a[e],s.push(t.toJSON());return s}.call(e)})),n}}(this)}):void 0},a.prototype.resultFocused=function(e){var t;return $(".feedback-search-result.anchor").removeClass("anchor"),t=$(e.target),t.addClass("anchor"),this.resultIsBeingClicked?void 0:t.is(".selected")?void 0:this.select(e.target,"new")},a.prototype.resultClicked=function(e){return this.resultIsBeingClicked=!0,this.select(e.target,this.mode(e))},a.prototype.resultReleased=function(){return this.resultIsBeingClicked=!1,this.focusEditor()},a.prototype.mode=function(e){return e.metaKey||e.ctrlKey?"toggle":e.shiftKey?"lasso":"new"},a.prototype.select=function(e,t){var n,a,s,o;switch(a=this.$comment(e),n=$(".feedback-search-result.anchor"),"lasso"===t&&0===n.length&&(t="new"),t){case"toggle":a.toggleClass("selected"),a.hasClass("selected")&&!a.is(":focus")&&a.focus();break;case"lasso":s=this.$results.children().between(n,a),s.addClass("selected");break;default:this.$selection().removeClass("selected"),a.addClass("selected"),a.is(":focus")||a.focus()}return this.selectedComments=function(){var e,t,n,a;for(n=this.selectedIds(),a=[],e=0,t=n.length;t>e;e++)o=n[e],a.push(this.comments.get(o));return a}.call(this),this.$el.toggleClass("feedback-selected",this.selectedComments.length>0),this.editSelected()},a.prototype.$selection=function(){return this.$el.find(".feedback-search-result.selected")},a.prototype.selectedIds=function(){var e,t,n,a,s;for(a=this.$selection(),s=[],t=0,n=a.length;n>t;t++)e=a[t],s.push($(e).attr("data-id"));return s},a.prototype.selectPrev=function(e){var t;return t=this.$selection().first().prev(".feedback-search-result"),t&&t.length>0?this.select(t,e):"new"===e?this.focusSearch():void 0},a.prototype.selectNext=function(e){var t;return t=this.$selection().last().next(".feedback-search-result"),t&&t.length>0?this.select(t,e):void 0},a.prototype.selectNone=function(){return this.select(null,"new")},a.prototype.$comment=function(e){return e?_.isArray(e)?this.$comment(e[0]):e.target?this.$comment(e.target):e.constructor===Houston.Feedback.Comment?$("#comment_"+e.id):$(e).closest(".feedback-search-result"):$()},a.prototype.keydown=function(t){switch(t.keyCode){case e.UP:return this.selectPrev(this.mode(t));case e.DOWN:return this.selectNext(this.mode(t));case e.ESC:return this.focusSearch()}},a.prototype.search=function(e){var t,n,a,s;if(history.pushState)return e&&e.preventDefault(),t=$("#search_feedback").serialize(),a=window.location.pathname+"?"+t,s=window.location.pathname+".xlsx?"+t,history.pushState({},"",a),$("#excel_export_button").attr("href",s),n=new Date,$.getJSON(a,function(e){return function(t){return e.selectNone(),e.comments=new Houston.Feedback.Comments(t,{parse:!0}),e.searchTime=new Date-n,e.render()}}(this))},a.prototype.render=function(){var e,t;return this.offset=0,t=this.template({comments:function(){var t,n,a,s;for(a=this.comments.slice(0,50),s=[],t=0,n=a.length;n>t;t++)e=a[t],s.push(e.toJSON());return s}.call(this)}),this.$results.html(t),this.$el.find("#search_report").html(this.renderSearchReport({results:this.comments.length,searchTime:this.searchTime})),this.focusSearch()},a.prototype.focusSearch=function(){return window.scrollTo(0,0),$("#search_feedback input").focus().select()},a.prototype.editSelected=function(){return 1===this.selectedComments.length?this.editComment(this.selectedComments[0]):this.selectedComments.length>1?this.editMultiple(this.selectedComments):this.editNothing()},a.prototype.editComment=function(e){return $("#feedback_edit").html(this.renderEditComment(e.toJSON())),this.focusEditor()},a.prototype.editMultiple=function(e){var t,n,a,s,o,l,r;a={count:e.length,tags:[]},l=function(){var t,a,s;for(s=[],t=0,a=e.length;a>t;t++)n=e[t],s.push(n.get("tags"));return s}().flatten(),r=l.groupBy();for(o in r)t=r[o],o.count=t.length,s=t.length/a.count,.2>s&&(s=.2),a.tags.push({name:o,percent:s});return $("#feedback_edit").html(this.renderEditMultiple(a)),this.focusEditor()},a.prototype.editNothing=function(){return $("#feedback_edit").html("")},a.prototype.focusEditor=function(){return $("#feedback_edit").find("input").focus()},a.prototype.removeTag=function(e){var t,n,a,s;return e.preventDefault(),e.stopImmediatePropagation(),t=$(e.target).closest(".feedback-tag"),a=t.text().replace(/\s/g,""),n=this.selectedIds(),s=[a],$.destroy("/feedback/comments/tags",{comment_ids:n,tags:s}).success(function(e){return function(){var t,a,o;for(a=0,o=n.length;o>a;a++)t=n[a],e.comments.get(t).removeTags(s);return e.editSelected()}}(this)).error(function(){return console.log("error",arguments)})},a.prototype.keydownNewTag=function(t){return t.keyCode===e.RETURN?(t.preventDefault(),t.stopImmediatePropagation(),this.addTag()):void 0},a.prototype.addTag=function(){var e,t,n;return e=$(".feedback-new-tag"),n=e.val().split(/[,;]/).map(function(e){return e.compact().toLowerCase().replace(/\s+/,"-")}),t=this.selectedIds(),$.post("/feedback/comments/tags",{comment_ids:t,tags:n}).success(function(e){return function(){var a,s,o;for(s=0,o=t.length;o>s;s++)a=t[s],e.comments.get(a).addTags(n);return e.editSelected()}}(this)).error(function(){return console.log("error",arguments)})},a.prototype.promptToImportCsv=function(e){var t;return t=$(this.renderImportModal(e)).modal(),t.on("hidden",function(){return $(this).remove()}),t.find("#import_button").click(function(e){return function(){var n;return t.find("button").prop("disabled",!0),n=t.find("form").serialize(),$.post(""+window.location.pathname+"/import",n).success(function(n){return t.modal("hide"),alertify.success(""+n.count+" comments imported"),e.search()}).error(function(){return console.log("error",arguments),t.find("button").prop("disabled",!1)})}}(this))},a.prototype.deleteComments=function(e){var t,n,a,s;return e.preventDefault(),a=this.selectedIds(),s=_.uniq(function(){var e,t,s;for(s=[],e=0,t=a.length;t>e;e++)n=a[e],s.push(this.comments.get(n).get("import"));return s}.call(this)),1===s.length&&s[0]?(t=$(this.renderDeleteImportedModal()).modal(),t.on("hidden",function(){return $(this).remove()}),t.find("#delete_selected").click(function(e){return function(){return t.modal("hide"),e._deleteComments({comment_ids:a})}}(this)),t.find("#delete_imported").click(function(e){return function(){return t.modal("hide"),e._deleteComments({"import":s[0]})}}(this))):this._deleteComments({comment_ids:a})},a.prototype._deleteComments=function(e){return $.destroy("/feedback/comments",e).success(function(e){return function(t){return alertify.success(""+t.count+" comments deleted"),e.search()}}(this)).error(function(){return console.log("error",arguments)})},a.prototype.newFeedback=function(t){var n,a,s,o;return t&&t.preventDefault(),n=$(this.renderNewCommentModal()).modal(),n.on("hidden",function(){return $(this).remove()}),n.find("#new_feedback_customer").focus(),a=n.find(".feedback-new-tag"),s=function(){return function(){var e,t,s,o,l;for(s=a.val().split(/[,;]/).map(function(e){return e.compact().toLowerCase().replace(/\s+/,"-")}),e=n.find(".feedback-tag-list"),o=0,l=s.length;l>o;o++)t=s[o],e.append('<span class="feedback-tag feedback-tag-new">\n  '+t+'\n  <input type="hidden" name="tags[]" value="'+t+'" />\n  <a class="feedback-remove-tag"><i class="fa fa-close"></i></a>\n</span>');return a.val("")}}(this),o=function(e){return function(){var t;return s(),t=n.find("form").serialize(),$.post(window.location.pathname,t).success(function(){return n.modal("hide"),alertify.success("Comment created"),e.search()}).error(function(){return console.log("error",arguments)})}}(this),a.keydown(function(t){return t.keyCode===e.RETURN?t.metaKey||t.ctrlKey?o():(t.preventDefault(),s()):void 0}),n.on("click",".feedback-remove-tag",function(e){return $(e.target).closest(".feedback-tag-new").remove(),n.find(".feedback-new-tag").focus()}),n.find("#create_button").click(function(){return function(){return o()}}(this))},a}(Backbone.View)}.call(this);