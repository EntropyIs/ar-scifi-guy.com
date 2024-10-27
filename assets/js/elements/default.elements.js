/**
 * Default Elements Templates
 * entropyis.me | Entropy Is Software Development
 * Deigns for Header, Navigation and Footer Elements
 */


/**
 * Site Header & Nav
 */

// Navigation Links
function pharse_page(page, parent)
{
    var element = "";

    // Add Dropdown Code if Child Pages Exist
    if (page.pages.length > 0){
        element += `<div class="menu_dropdown">`;
    }

    if (page.is_page || page.pages.length > 0){
        element += `<a href="`
    }

    if (parent != null){
        element += parent + "/";
    }
    
    if (page.is_page){
            element += page.href_file + page.href_ext +`"`;
    } else if (page.pages.length > 0){
        element += `javascript:void(0)`;
    }
    
    if (page.pages.length > 0){
        element += ` class="menu_dropdown-button"`;
    }

    if (page.is_page || page.pages.length > 0){
        element += ">";
    }
    
    if (page.pages.length > 0){
        element += `<i class="fa-solid fa-bars"></i> `;
    }

    if (page.is_page || page.pages.length > 0){
        element += page.link_description + "</a>";
    }

    if (page.pages.length > 0){
        element += `<div class="menu_dropdown-content">`;
        $.each(page.pages, function(index, child){
            element += pharse_page(child, page.href_file)
        });
        element += `</div></div>`;
    }
    return element;
}

$.getJSON(`assets/data/site_map.json`, function(map_data){
    var navLinks = [];

    $.each(map_data.pages, function(index, page){
        var nav_link = pharse_page(page, null);
        console.log(nav_link);
        navLinks.push(nav_link);
    });

    console.log(navLinks)

    $("<nav>", {
        html : navLinks.join( " | " ),
        class : "menu"
    }).appendTo("#header");
});


/**
 * Site Footer
 */

$("<div>", {
    class : "inner",
    id : "footer-inner"
}).appendTo("footer");

$("<ul>", {
    class : "icons",
    id : "ext-links"
}).appendTo("#footer-inner");

$("<ul>", {
    class : "copyright",
    id : "copyright"
}).appendTo("#footer-inner");

// External Links (Footer)
$.getJSON(`assets/data/links.json`, function(link_data){
    var extLinks = [];

    $.each(link_data.social_links, function(index, link){
        extLinks.push(`<a href="` + link.href + `"><i class="` + link.icon + `"></i> ` + link.description + `</a>`);
    })

    $.each(link_data.other_links, function(index, link){
        extLinks.push(`<a href="` + link.href + `"><i class="` + link.icon + `"></i> ` + link.description + `</a>`);
    })

    console.log(extLinks)

    $.each(extLinks, function(index, link){
        $("<li>", {
            html : link
        }).appendTo("#ext-links");
    });
});

// Copyright Lines (Footer)
var copyrightLines = [];
copyrightLines.push(`&copy; Copyright 2024, Spice of Life Entertainment. All rights reserved.`);
copyrightLines.push(`Design: <a href="https://entropyis.me">Entropy Is Software Development</a>`);
copyrightLines.push(`<a href="privacy-policy.html">Privacy Policy</a>`);

$.each(copyrightLines, function(index, line){
    $("<li>", {
        html : line
    }).appendTo("#copyright");
});
