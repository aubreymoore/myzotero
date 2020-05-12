$(document).ready(function () {
    $("div.authors-list input#txtSearchTerm").bind("keydown", function (event) {
        // track enter key
        var keycode = (event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode));
        if (keycode == 13) { // keycode for enter key
            // force the 'Enter Key' to implicitly click the Update button
            $('#fetchAuthors').click();
            return false;
        } else {
            return true;
        }
    }); // end of function

    if (getParameterByName('st')) {
        $("input#txtSearchTerm").val(getParameterByName('st'));
        //$('#fetchAuthors').click();
        var pn = 0;
        if (getParameterByName('pn'))
            pn = getParameterByName('pn');
        SetAuthorDisplay(pn);
    }

}); // end of document ready

function SetAuthorDisplay(dispContainer) {
    var facetLimit = 10000;
    var authorName = $("input#txtSearchTerm").val();
    var numberOfCharactersBeforeSearch = 2;
    var pageLimit = cd4.isMobileSite ? 10 : 15;
    if (authorName.length >= numberOfCharactersBeforeSearch) {

        var urlAuthorSearch = "/search/facetsearch/?facetname=author&numFacets=" + facetLimit + "&filter=" + authorName;
        
        $.getJSON(urlAuthorSearch, function (data) {

            var matches = JSON.stringify(data.Matches);
            matches = matches.replace(/[{}]/g, "");

            var arrMatches = new Array(); // Original array of Matches
            arrMatches = matches.split(",\"");
            
            var jsonObj = [];

            for (var i = 0; i < arrMatches.length; i++) {

                //Get the first entry
                var currentAuthorName = arrMatches[i].substring(0, arrMatches[i].lastIndexOf(":") - 1);

                //only for the 1st name we get ""name" instead of "name"
                if (i == 0) {
                    if (currentAuthorName.substring(0, 1) == '"')
                        currentAuthorName = currentAuthorName.substring(1);
                }

                //Does it start with the search term, if not discard it
                var haystack = currentAuthorName.toLowerCase();
                var needle = authorName.toLowerCase();
                var nameStartsWith = (haystack.substr(0, needle.length) == needle);
                
                //process it further only if it starts with the search term, if not discard it
                //(we should exit at this point, but until the index in place to make sure the data is coming back in alphabatical order, we have to check all the elements coming back from the API).
                if (nameStartsWith) {

                    var authorTitle = arrMatches[i].substring(0, arrMatches[i].lastIndexOf(":") - 1);
                    if (i == 0) authorTitle = arrMatches[i].substring(1, arrMatches[i].lastIndexOf(":") - 1);
                    var authorCount = arrMatches[i].substring(arrMatches[i].lastIndexOf(":") + 1);

                    var objAuthors = {
                                        'authorTitle': authorTitle,
                                        'authorCount': authorCount,
                                        'searchterm': authorName
                                    };
                    jsonObj.push(objAuthors);
                }
                else {
                    //do not add it the json object   
                }
            }

            if (dispContainer === '0')
                parent.location.hash = '';
            else
                window.location.hash = "#authorsDisplayContainer-" + dispContainer;

            var selectedAuthor = '';
            if (getParameterByName('q').match("^author")) {
                selectedAuthor = getParameterByName('q').substr(getParameterByName('q').indexOf(":") + 1).replace(/\"/g, "");
            }

            if (jsonObj.length > 0) {
                $('.authorsResultsHeading').html("<span class=\"strong\">" + "Search Results " + "> </span>" + authorName);
                var data = JSON.stringify(jsonObj);
                $("#authorsDisplayContainer").showResults(jsonObj, {
                    resultTarget: '#authorsSearchResults',
                    pagesTarget: '.pagination',
                    field : "author",
                    arrows: ['<span class="ui-icon ui-icon-triangle-1-n"></span>', '<span class="ui-icon ui-icon-triangle-1-s"></span>'],
                    searchKeyword: selectedAuthor,
                    pages: pageLimit
                });
                $("#authordisplay").empty();

                

                $('#authorsSearchResults').find('a').each(function () {
                    if ($(this).text() === selectedAuthor) {
                        $(this).css('background-color', 'yellow');
                    }

                    addPagingFromHash(this);
                });

                $("div.pageSize > select").change(function () {
                    
                    $('#authorsSearchResults').empty();
                    $('.pagination').empty();
                    $("#authorsDisplayContainer").showResults(jsonObj, {
                        resultTarget: '#authorsSearchResults',
                        pagesTarget: '.pagination',
                        field: "author",
                        arrows: ['<span class="ui-icon ui-icon-triangle-1-n"></span>', '<span class="ui-icon ui-icon-triangle-1-s"></span>'],
                        searchKeyword: selectedAuthor,
                        pages: pageLimit
                    });

                });
            }
            else {
                    $('#authorsSearchResults').empty();
                    $('.pagination').empty();
                    $('.authorsResultsHeading').empty();
                    $(".pageSize").css({ display: 'none' });
                }
        });

    }
    else
    {
        $("#authordisplay").html("Please enter atleast two letters to perform the search: " + authorName);
        $('#authorsSearchResults').empty();
        $('.pagination').empty();
        $('.authorsResultsHeading').empty();
    }
};


function StatsForAuthors() {

    debugger;
    var searchTerm = '';
    var facetLimit = 5000;
    var html = '';
    var urlAuthorSearch = '';
    var grandTotal = 0;
    var numberOfRecordsPerName = 25;

    for (var i = 86; i <= 86; i++) {

        grandTotal = 0;
        for (var j = 65; j <= 90; j++) {

            setTimeout(function () { }, 50000);//delay enough to get the next search to return value

            searchTerm = String.fromCharCode(i) + String.fromCharCode(j);
            searchTerm = searchTerm.toLowerCase();
            $("#output").html(searchTerm);

            //urlAuthorSearch = "http://stagingml1:12210/abstract/facets/author?query=author:" + searchTerm + "*&facet-options=item,asc&filter=" + searchTerm + "&facet-limit=" + facetLimit;
            urlAuthorSearch = "http://devml1:12210/abstract/facets/author?query=author:" + searchTerm + "*&facet-options=item,asc&filter=" + searchTerm + "&facet-limit=" + facetLimit;

            $.ajax(urlAuthorSearch, {
                crossDomain: true, async: false, data: searchTerm
            }
            ).success(function (data) {

                var facets = data.getElementsByTagName("facet");
                var authors = [];
                var allAuthors = '';
                var allAuthorsInThis = '';

                for (var k = 0; k < facets.length; k++) {

                    //if (facets[k].childNodes[1].childNodes[0].data > numberOfRecordsPerName) { 

                    //var tempAuthorName = '';
                    //tempAuthorName = getSurname(facets[k].childNodes[0].childNodes[0].data);

                    allAuthorsInThis += ' <br /> ' + facets[k].childNodes[0].childNodes[0].data;

                    if (getSurname(facets[k].childNodes[0].childNodes[0].data).startsWith(searchTerm)) {
                        var tempAuthorName = searchTerm;

                        if (!authors.hasOwnProperty(tempAuthorName)) {
                            authors[tempAuthorName] = [];
                        }

                        authors[tempAuthorName].push(facets[k].childNodes[0].childNodes[0].data);
                        //allAuthors += facets[k].childNodes[0].childNodes[0].data + ', ';
                    }
                    //}
                }

                var noofAuthors = 0;
                if (authors[tempAuthorName] != null) {
                    noofAuthors = authors[tempAuthorName].length;
                    grandTotal += noofAuthors;
                } else {
                    noofAuthors = 0;
                }

                html += SetAuthorDisplaySingleColumnStats(authors, searchTerm, allAuthors, noofAuthors, grandTotal, allAuthorsInThis);
                $("#authordisplay").html(html);

            });
        }//for j
    }//for i

};

function SetAuthorDisplaySingleColumnStats(authors, searchTerm, allAuthors, noofAuthors, grandTotal, allAuthorsInThis) {
    var currentRunningTotal = 1;
    var html = '';
    if (authors != null) {

        for (var author in authors) {
            //Restrict authors that starts with search term only      
            //if (author.length > 0 && author.toString().startsWith(searchTerm)) { 

            //html += "<div id='" + author.toString() + "'>" + currentRunningTotal + " - " + author.toString() + "(" + author.length.toString() + ")</div>";
            //html += "<div id='" + author.toString() + "' title='" + allAuthorsInThis + "'>" + author.toString() + "(" + noofAuthors.toString() + ") (" + grandTotal.toString() + ")</div>";
            html += "<table><tr>";
            html += "   <td style='width:50px;border-style:solid;border-width:3px;vertical-align: top;'>" + author.toString() + "</td></tr>";
            html += "   <td style='width:250px;border-style:solid;border-width:3px;vertical-align: top;'>" + author.length.toString() + "</td>";
            html += "   <td style='width:50px;border-style:solid;border-width:3px;vertical-align: top;'>" + allAuthorsInThis + "</td>";
            html += "   <td style='width:50px;border-style:solid;border-width:3px;vertical-align: top;'>" + noofAuthors.toString() + "</td>";
            html += "   <td style='width:50px;border-style:solid;border-width:3px;vertical-align: top;'>" + grandTotal.toString() + "</td>";
            html += "</tr></table>";

            currentRunningTotal++;

            //}
        }

    }

    return html;

};


function GenerateSearchTerm() {

    var searchTerm1 = '';
    for (var p = 65; p <= 90; p++) {

        for (var q = 65; q <= 90; q++) {
            searchTerm1 += (String.fromCharCode(p) + String.fromCharCode(q)).toLowerCase() + ',';
        }
    }
    return searchTerm1;

    /*
    aa,ab,ac,ad,ae,af,ag,ah,ai,aj,ak,al,am,an,ao,ap,aq,ar,as,at,au,av,aw,ax,ay,az,ba,bb,bc,bd,be,bf,bg,bh,bi,bj,bk,bl,bm,bn,bo,bp,bq,br,bs,bt,bu,bv,bw,bx,by,bz,ca,cb,cc,cd,ce,cf,cg,ch,ci,cj,ck,cl,cm,cn,co,cp,cq,cr,cs,ct,cu,cv,cw,cx,cy,cz,da,db,dc,dd,de,df,dg,dh,di,dj,dk,dl,dm,dn,do,dp,dq,dr,ds,dt,du,dv,dw,dx,dy,dz,ea,eb,ec,ed,ee,ef,eg,eh,ei,ej,ek,el,em,en,eo,ep,eq,er,es,et,eu,ev,ew,ex,ey,ez,fa,fb,fc,fd,fe,ff,fg,fh,fi,fj,fk,fl,fm,fn,fo,fp,fq,fr,fs,ft,fu,fv,fw,fx,fy,fz,ga,gb,gc,gd,ge,gf,gg,gh,gi,gj,gk,gl,gm,gn,go,gp,gq,gr,gs,gt,gu,gv,gw,gx,gy,gz,ha,hb,hc,hd,he,hf,hg,hh,hi,hj,hk,hl,hm,hn,ho,hp,hq,hr,hs,ht,hu,hv,hw,hx,hy,hz,ia,ib,ic,id,ie,if,ig,ih,ii,ij,ik,il,im,in,io,ip,iq,ir,is,it,iu,iv,iw,ix,iy,iz,ja,jb,jc,jd,je,jf,jg,jh,ji,jj,jk,jl,jm,jn,jo,jp,jq,jr,js,jt,ju,jv,jw,jx,jy,jz,ka,kb,kc,kd,ke,kf,kg,kh,ki,kj,kk,kl,km,kn,ko,kp,kq,kr,ks,kt,ku,kv,kw,kx,ky,kz,la,lb,lc,ld,le,lf,lg,lh,li,lj,lk,ll,lm,ln,lo,lp,lq,lr,ls,lt,lu,lv,lw,lx,ly,lz,ma,mb,mc,md,me,mf,mg,mh,mi,mj,mk,ml,mm,mn,mo,mp,mq,mr,ms,mt,mu,mv,mw,mx,my,mz,na,nb,nc,nd,ne,nf,ng,nh,ni,nj,nk,nl,nm,nn,no,np,nq,nr,ns,nt,nu,nv,nw,nx,ny,nz,oa,ob,oc,od,oe,of,og,oh,oi,oj,ok,ol,om,on,oo,op,oq,or,os,ot,ou,ov,ow,ox,oy,oz,pa,pb,pc,pd,pe,pf,pg,ph,pi,pj,pk,pl,pm,pn,po,pp,pq,pr,ps,pt,pu,pv,pw,px,py,pz,qa,qb,qc,qd,qe,qf,qg,qh,qi,qj,qk,ql,qm,qn,qo,qp,qq,qr,qs,qt,qu,qv,qw,qx,qy,qz,ra,rb,rc,rd,re,rf,rg,rh,ri,rj,rk,rl,rm,rn,ro,rp,rq,rr,rs,rt,ru,rv,rw,rx,ry,rz,sa,sb,sc,sd,se,sf,sg,sh,si,sj,sk,sl,sm,sn,so,sp,sq,sr,ss,st,su,sv,sw,sx,sy,sz,ta,tb,tc,td,te,tf,tg,th,ti,tj,tk,tl,tm,tn,to,tp,tq,tr,ts,tt,tu,tv,tw,tx,ty,tz,ua,ub,uc,ud,ue,uf,ug,uh,ui,uj,uk,ul,um,un,uo,up,uq,ur,us,ut,uu,uv,uw,ux,uy,uz,va,vb,vc,vd,ve,vf,vg,vh,vi,vj,vk,vl,vm,vn,vo,vp,vq,vr,vs,vt,vu,vv,vw,vx,vy,vz,wa,wb,wc,wd,we,wf,wg,wh,wi,wj,wk,wl,wm,wn,wo,wp,wq,wr,ws,wt,wu,wv,ww,wx,wy,wz,xa,xb,xc,xd,xe,xf,xg,xh,xi,xj,xk,xl,xm,xn,xo,xp,xq,xr,xs,xt,xu,xv,xw,xx,xy,xz,ya,yb,yc,yd,ye,yf,yg,yh,yi,yj,yk,yl,ym,yn,yo,yp,yq,yr,ys,yt,yu,yv,yw,yx,yy,yz,za,zb,zc,zd,ze,zf,zg,zh,zi,zj,zk,zl,zm,zn,zo,zp,zq,zr,zs,zt,zu,zv,zw,zx,zy,zz
    */
}



function SetAuthorDisplay1(columnSingle) {

    //delay the response as we do not want to search too soon as they user types in

    setTimeout(function () { }, 2000);

    var facetLimit = 10000;
    var authorName = $("input#txtSearchTerm").val();
    var numberOfCharactersBeforeSearch = 2;

    if (authorName.length > numberOfCharactersBeforeSearch) {

        //var urlAuthorSearch = "http://stagingml1:12210/abstract/facets/author?query=author:" + authorName + "*&facet-options=item,asc&filter=" + authorName + "&facet-limit=" + facetLimit;
        //var urlAuthorSearch = "http://devml1:12210/abstract/facets/author?query=author:" + authorName + "*&facet-options=item,asc&filter=" + authorName + "&facet-limit=" + facetLimit;
        var urlAuthorSearch = "/search/facetsearch/?facetname=author&numFacets=5000&filter=" + authorName + "&query=" + authorName;


        $.getJSON(urlAuthorSearch, function (data) {
            var Matches = JSON.stringify(data.Matches);
            Matches = Matches.replace(/[{}]/g, "");

            var arrMatches = new Array(); // Original array of Matches
            arrMatches = Matches.split(",\"");

            //var html = '';
            jsonObj = [];

            for (i = 0; i < arrMatches.length; i++) {
                item = {};
                item["authorTitle"] = arrMatches[i].substring(0, arrMatches[i].lastIndexOf(":") - 1);
                if (i == 0)
                    item["authorTitle"] = arrMatches[i].substring(1, arrMatches[i].lastIndexOf(":") - 1);
                item["authorCount"] = arrMatches[i].substring(arrMatches[i].lastIndexOf(":") + 1);
                jsonObj.push(item);

                //html += "<div id='" + item["authorTitle"] + "'>" + i + ' - ' + '<a target="_blank" href="http://prerelease-cd4/cabdirect/search/?q=author:("' + item["authorTitle"] + '")">' + item["authorTitle"] + '</a>' + "(" + item["authorCount"] + ")</div>";
            }

            //$("#authordisplay").html(html);

            parent.location.hash = '';

            if (jsonObj.length > 0) {
                var data = JSON.stringify(jsonObj);
                console.log(data);
                $("#authorsDisplayContainer").showResults(jsonObj, {

                    resultTarget: '#authorsSearchResults',
                    pagesTarget: '.pagination',
                    //bgColors: ['trCell1', 'trCell2'],
                    arrows: ['<span class="ui-icon ui-icon-triangle-1-n"></span>', '<span class="ui-icon ui-icon-triangle-1-s"></span>']
                });
            }
            else {
                $('#authorsSearchResults').empty();
                $('.pagination').empty();
            }


            console.log(JSON.stringify(jsonObj));
        });



        //$.ajax(urlAuthorSearch, {
        //    crossDomain: true
        //}
        //).success(function (data) {

        //    var facets = data.getElementsByTagName("facet");

        //    //console.log(facets);
        //    var authors = [];

        //    for (var i = 0; i < facets.length; i++) {

        //        var tempAuthorName = '';
        //        tempAuthorName = getSurname(facets[i].childNodes[0].childNodes[0].data);

        //        if (!authors.hasOwnProperty(tempAuthorName)) {
        //            authors[tempAuthorName] = [];
        //        }
        //        authors[tempAuthorName].push(facets[i].childNodes[0].childNodes[0].data);
        //    }

        //    //console.log(authors);

        //    //console.log(authors); 
        //    if (!!columnSingle) /* http://stackoverflow.com/questions/154059/how-do-you-check-for-an-empty-string-in-javascript */
        //        displayAuthors(authors);
        //    else
        //        SetAuthorDisplaySingleColumn(authors, authorName);
        //});

    } else {
        $("#authordisplay").html("Please enter atleast two letters to perform the search: " + authorName);
        $('#authorsSearchResults').empty();
        $('.pagination').empty();
    }
};

function displayAuthors(authors) {

    var j = 1; var l = 0; var html = '';
    var currentPageNumber = 0; var numberOfRecordsPerPage = 15; var numberOfColumns = 3;

    if (authors != null) {

        for (var key in authors) {

            if (l == 0) //when page starts 
                html = html + "<div id='whopper'>";

            if (j == 1) //when outer div is initiaated. Only need this div to sit outside of the 'every 3 columns'.
                html = html + "<div id='wrapper'>";

            var idValue = "";
            if (j == 1) idValue = "left"; //if the column is First
            else if (j == 2) idValue = "middle"; //if the column is Second
            else idValue = "right"; //if the column is Third , 


            var divtooltip = key.toString(); //TooltipForDiv(key);

            html += "<div id='" + idValue + "'" + "alt='" + divtooltip + "'" + "title='" + divtooltip + "'>";
            //html = html + authors[i][0].toString() + "(" + authors[i][1].toString() + ")"; //name of the author and count value
            html += key.toString() + "(" + key.length.toString() + ")"; //name of the author and count value    
            html += "</div>";

            j++; // increase coloumn number
            //We only need 3 columns, so reset it back to 1st column
            if (j == numberOfColumns + 1) {
                html = html + "</div>"; //close div 'wrapper' 
                j = 1;
            }

            l++; //increase records per page 
            //reset the page counter to default
            if (numberOfRecordsPerPage == l) {
                html = html + "<div id='next' name='" + currentPageNumber + "'> next " + currentPageNumber + " </div>";
                html = html + "</div>"; //close div 'Whopper' 
                l = 0;
                currentPageNumber++;
            }
        }
    }

    $("#authordisplay").html(html);
}


function TooltipForDiv(authors) {

    var returnValue = '';

    if (authors != null) {

        if (authors.length > 0) {
            for (var auth in authors) {
                returnValue += auth + " - ";
            }
        }
    }

    return returnValue;
}


function displayAuthors123(authors) {

    var j = 1;
    var l = 0;
    var currentPageNumber = 0;
    var html = '';
    var tempCount = 1;


    if (getSurname(facets[i].childNodes[0].childNodes[0].data) == tempAuthorName) {
        tempCount = tempCount + 1;
    }
    else {
        if (l == 0) //when page starts 
            html = html + "<div id='whopper'>";

        if (j == 1) //when outer div is initiaated. Only need this div to sit outside of the 'every 3 columns'.
            html = html + "<div id='wrapper'>";

        var idValue = "";
        if (j == 1) idValue = "left"; //if the column is First
        else if (j == 2) idValue = "middle"; //if the column is Second
        else idValue = "right"; //if the column is Third , 


        html = html + "<div id='" + idValue + "'>";
        html = html + tempAuthorName + "(" + tempCount + ")"; //name of the author and count value
        html = html + "</div>";

        j++; // increase coloumn number
        //We only need 3 columns, so reset it back to 1st column
        if (j == numberOfColumns + 1) {
            html = html + "</div>"; //close div 'wrapper' 
            j = 1;
        }

        l++; //increase records per page 
        //reset the page counter to default
        if (numberOfRecordsPerPage == l) {
            html = html + "<div id='next' name='" + currentPageNumber + "'> next " + currentPageNumber + " </div>";
            html = html + "</div>"; //close div 'Whopper' 
            l = 0;
            currentPageNumber++;
        }

        //re-set the values back to default as the name has been added to the list. off to the new naem
        tempAuthorName = ''; //getSurname(facets[i].childNodes[0].childNodes[0].data);
        tempCount = 1;
    }

    $("#authordisplay").html(html);
}


function getSurname(combinedName) {

    var returnValue = '';

    if (combinedName != '') {

        returnValue = spliterSurname(combinedName, ','); // seperator is 'comma'

        if (returnValue == '')
            returnValue = spliterSurname(combinedName, '.');// seperator is 'full stop'
    }

    return returnValue;
}


function spliterSurname(surname, splitter) {

    var returnValue = '';

    //if there is a name value exists
    if (surname != '') {

        var splitNames = surname.split(splitter);

        if (splitNames != null) {

            if (splitNames[0] != null) {

                returnValue = splitNames[0].toString().trim().toLowerCase();
            }
        }
    }

    return returnValue;
}


function SetAuthorDisplaySingleColumn(authors, searchTerm) {

    var html = '';
    var count = 0;
    //createJSON(authors);
    if (authors != null) {

        for (var author in authors) {
            //Restrict authors that starts with search term only
            //if (author.length > 0 && author.toString().startsWith(searchTerm)) {
            html += "<div id='" + author.toString() + "'>" + count + ' - ' + '<a target="_blank" href="http://prerelease-cd4/cabdirect/search/?q=author:("' + author.toString() + '")">' + author.toString() + '</a>' + "(" + author.length.toString() + ")</div>";
            count++;
            //}
        }
    }

    //return html;
    $("#authordisplay").html(html);
};

function SetAuthorDisplayOld() {
    var numberOfRecordsPerPage = 15;
    var numberOfColumns = 3;
    var facetLimit = 2500;
    var authorName = $("input#txtSearchTerm").val();

    if (authorName.length > 1) {

        var urlAuthorSearch = "http://devml1:12210/abstract/facets/author?query=author:" + authorName + "*&facet-options=item,asc&filter=" + authorName + "&facet-limit=" + facetLimit;

        $.ajax(urlAuthorSearch, {
            crossDomain: true
        }
        ).success(function (data) {

            //console.log(data);
            var facets = data.getElementsByTagName("facet");

            var html = '';
            var j = 1;
            var l = 0;
            var currentPageNumber = 0;

            for (var i = 0; i < facets.length; i++) {

                if (l == 0)    //when page starts 
                    html = html + "<div id='whopper'>";

                if (j == 1)//when outer div is initiaated. Only need this div to sit outside of the 'every 3 columns'.
                    html = html + "<div id='wrapper'>";

                var idValue = "";
                if (j == 1) idValue = "left"; //if the column is First
                else if (j == 2) idValue = "middle";//if the column is Second
                else idValue = "right";//if the column is Third


                html = html + "<div id='" + idValue + "'>";
                html = html + facets[i].childNodes[0].childNodes[0].data; //name of the author
                html = html + "(" + facets[i].childNodes[1].childNodes[0].data + ")"; // count value
                html = html + "</div>";

                j++; // increase coloumn number
                //We only need 3 columns, so reset it back to 1st column
                if (j == numberOfColumns + 1) {
                    html = html + "</div>"; //close div 'wrapper'
                    j = 1;
                }

                l++;//increase records per page 
                //reset the page counter to default
                if (numberOfRecordsPerPage == l) {
                    html = html + "<div id='next' name='" + currentPageNumber + "'> next " + currentPageNumber + " </div>";
                    html = html + "</div>"; //close div 'Whopper'
                    l = 0;
                    currentPageNumber++;
                }
            }
            debugger;
            $("#authordisplay").html(html);
        });

    } else {
        $("#authordisplay").html("Please enter atleast two letters to perform the search: " + authorName);
    }
};
