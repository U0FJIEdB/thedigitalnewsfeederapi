require("dotenv").config()
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')
const { find } = require("cheerio/lib/api/traversing")
const PORT =process.env.PORT
const Articles = []
const newsArticles=[]
const cricketArticles=[]
const app = express()

const newspapers = [
    {
        name: 'indianexpress',
        address: 'https://indianexpress.com/section/india/',
        base: '',
    },
    {
        name: 'timesofindia',
        address: 'https://timesofindia.indiatimes.com/india',
        base: '',
    },
    {
        name: 'ndtv',
        address: 'https://www.ndtv.com/india#pfrom=home-ndtv_mainnavgation',
        base: '',
    },
    {
        name: 'indiatoday',
        address:'https://www.indiatoday.in/india',
        base: '',
    },
    {
        name: 'thehindu',
        address: 'https://www.thehindu.com/news/national/',
        base: '',
    },
    {
        name: 'news18',
        address: 'https://www.news18.com/india/',
        base: '',
    },
    {
        name: 'deccanchronicle',
        address: 'https://www.deccanchronicle.com/nation',
        base: '',
    },
    {
        name: 'dnaindia',
        address: 'https://www.dnaindia.com/india',
        base: '',
    },
    {
        name:'crickbuzz',
        address:'https://www.cricbuzz.com/cricket-series/',
        base:''
    },
    {
        name:'icccricket',
        address:'https://www.icc-cricket.com/',
        base:''
    }
]
//reading all articles
newspapers.forEach(newspaper => {
    //Indian Express
    if(newspaper.address=='https://indianexpress.com/section/india/'){
        axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            $('div[id="section"]>div[class="container"]>div[class="row"]>div[class="leftpanel"]>div[class="nation"]>div[class="articles first "]',html).each(function(){
                const title=$(this).find('h2').text()
                const description=$(this).find('p').text()
                const url=$(this).find('h2>a').attr('href')
                const time=$(this).find('div[class="date"]').text()
                Articles.push({
                    title,
                    description,
                    url,
                    time,
                    source:'Indian Express'
                })
            })
            $('div[id="section"]>div[class="container"]>div[class="row"]>div[class="leftpanel"]>div[class="nation"]>div[class="articles "]',html).each(function(){
                const title=$(this).find('h2').text()
                const description=$(this).find('p').text()
                const url=$(this).find('h2>a').attr('href')
                const time=$(this).find('div[class="date"]').text()
                Articles.push({
                    title,
                    description,
                    url,
                    time,
                    source:'Indian Express'
                })
            })
        })
    }

    //IndiaToday
    if(newspaper.address=='https://www.indiatoday.in/india'){
        axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            $('div[class="catagory-listing"]',html).each(function(){
                const url=$(this).find('a').attr('href')
                const title=$(this).find('h2').attr('title')
                const description=$(this).find('p').text()
                const image=$(this).find('img').attr('src')
                Articles.push({
                    title,
                    description,
                    image,
                    url:'https://www.indiatoday.in/'+url,
                    source:'India Today'
                })
            })
        })
    }

    //News 18
    if(newspaper.address=='https://www.news18.com/india/'){
        axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            $('div[class="jsx-3386632719 blog_list"]>div[class="jsx-3386632719 blog_list_row"]',html).each(function(){
                const title=$(this).find('img').attr('title')
                const description=$(this).find('img').attr('title')
                const url=$(this).find('a').attr('href')
                
                const image=$(this).find('div[class="jsx-3386632719 blog_list"]>div[class="jsx-3386632719 blog_list_row"]>a>figure[class="jsx-3386632719"]>div[class="jsx-3386632719 blog_img"]>img[class="jsx-3386632719 lazyloaded"]').attr('src')
                Articles.push({
                    title,
                    description,
                    image,
                    url,
                    source:'News 18'
                })
            })
        })
    }
    
    // Times of India
    if(newspaper.address=='https://timesofindia.indiatimes.com/india'){
        axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            
            $('div[class="main-content"]>div[id="c_wdt_list_1"]>ul[class="list5 clearfix"]>li>span[class="w_tle"]',html).each(function(){
                const title=$(this).text()
                const description=$(this).text()
                const url=$(this).find('a').attr('href')
                Articles.push({
                    title,
                    description,
                    url:'https://timesofindia.indiatimes.com/'+url,
                    source:'Times of India'
                })
            })
            $('div[class="main-content"]>div[id="c_030106"]>div[id="c_03010601"]>div[id="c_wdt_list_1"]>ul[class="list5 clearfix"]>li>span[class="w_tle"]',html).each(function(){
                const title=$(this).text()
                const description=$(this).text()
                const url=$(this).find('a').attr('href')
                    Articles.push({
                        title,
                        description,
                        url:'https://timesofindia.indiatimes.com/'+url,
                        source:'Times of India'
                    })
                })
            })
    }

    //DNA India
    if(newspaper.address=='https://www.dnaindia.com/india'){
        axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            $('div[class="container main-layout"]>div[class="row"]>div[class="col-12 col-lg-6"]>div[class="list-news"]>div[class="explainer-subtext"]',html).each(function(){
                const title=$(this).find('a').text()
                const description=$(this).find('a').text()
                const url=$(this).find('a').attr('href')
                Articles.push({
                    title,
                    description,
                    url:'https://www.dnaindia.com/india'+url,
                    source:'DNA India'
                })
            })
            
        })
    }

    //Deccan Chronicle
    if(newspaper.address=='https://www.deccanchronicle.com/nation'){
        axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            $('div[id="topStory"]>div[class="col-lg-8 col-md-8 col-sm-12 noPadding"]>div[class="col-sm-12 noPadding topStoryContainer"]>div[class="col-sm-7 noPadding"]>div[class="col-sm-12 noPadding stry-top-big-a"]',html).each(function(){
                const title=$(this).find('h2').text()
                const description=$(this).find('div[class="stry-hd-sml-cnt stry-big-cnt"]').text()
                const url=$(this).find('a').attr('href')
                Articles.push({
                    title,
                    description,
                    url:'https://www.deccanchronicle.com'+url,
                    source:'Deccan Chronicle'
                })
            })
            $('div[id="topStory"]>div[class="col-lg-8 col-md-8 col-sm-12 noPadding"]>div[class="col-sm-12 noPadding topStoryContainer"]>div[class="col-sm-5 tsSmall"]>div[class=" col-sm-12 col-xs-12 tstry-feed-sml-a"]',html).each(function(){
                const title=$(this).find('h3').text()
                const description=$(this).find('h3').text()
                const url=$(this).find('a').attr('href')
                Articles.push({
                    title,
                    description,
                    url:'https://www.deccanchronicle.com'+url,
                    source:'Deccan Chronicle'
                })
            })
            $('div[class="col-sm-12 col-xs-12 noPadding startBlock CurrentAffairsSection"]>div[class="col-sm-12 sectionHighLight noPadding"]>div[class="col-sm-12 secColorHolder"]>div[class="col-sm-3 col-xs-12 noPadding-xs"]',html).each(function(){
                const title=$(this).find('h3').text()
                const description=$(this).find('h3').text()
                const url=$(this).find('a').attr('href')
                Articles.push({
                    title,
                    description,
                    url:'https://www.deccanchronicle.com'+url,
                    source:'Deccan Chronicle'
                })
            })
        })

    }

    //The Hindu
    if(newspaper.address=='https://www.thehindu.com/news/national/'){
        axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            $('div[class="container container-mobile"]>div[class="main"]>div[class="row"]>div[class="100_3x_1Story"]>div[class="col-xs-12"]> div[class="story1-3x100-container hover-icon"]> div[class="story1-3x100-img ElccLeadd"]',html).each(function(){
                const title=$(this).text()
                const description=$(this).text()
                const url=$(this).find('a').attr('href')
                Articles.push({
                    title,
                    description,
                    url,
                    source:'The Hindu'
                })
            })
            $('div[class="container container-mobile"]>div[class="main"]>div[class="row"]>div[class="50_1x_StoryCard mobile-padding"]>div[class="col-lg-6 col-md-6 col-sm-6 col-xs-12"]>div[data-paywall="false"]>div[class="story-card"]',html).each(function(){
                const title=$(this).find('h2>a').text()
                const description=$(this).find('h2>a').text()
                const url=$(this).find('h2>a').attr('href')
                Articles.push({
                    title,
                    description,
                    url,
                    source:'The Hindu'
                })
            })
            $('section[class="otherArticles"]>div[class="container section-container"]>div[class="main"]>div[class="row"]>div[class="50_1x_StoryCard mobile-padding storyCardParentDiv"]>div[class="col-lg-6 col-md-6 col-sm-6 col-xs-12"]>div[data-paywall="false"]>div[class="story-card"]>div[class="story-card-news"]>h3',html).each(function(){
                const title=$(this).find('a').text()
                const description=$(this).find('a').text()
                const url=$(this).find('a').attr('href')
                Articles.push({
                    title,
                    description,
                    url,
                    source:'The Hindu'
                })
            })
            $('section[class="otherArticles"]>div[class="container section-container"]>div[class="main"]>div[class="row"]>div[class="33_1x_OtherStoryCard mobile-padding"]>div[class="col-lg-4 col-md-4 col-sm-4 col-xs-12 hover-icon"]>div[class="Other-StoryCard"]',html).each(function(){
                const title=$(this).find('h3>a').text()
                const description=$(this).find('a').text()
                const url=$(this).find('a').attr('href')
                Articles.push({
                    title,
                    description,
                    url,
                    source:'The Hindu'
                })
            })
        })
    } 

    //NDTV News
    if(newspaper.address=='https://www.ndtv.com/india#pfrom=home-ndtv_mainnavgation'){
        axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            $('div[class="sp-wrp"]>div[class="sp-hd"]>div[class="sp-ttl-wrp"]>div[class="sp-cn ins_storybody lstng_Pg"]>div[class="lisingNews"]>div[class="news_Itm"]',html).each(function(){
                const title=$(this).find('a').text()
                const description=$(this).find('p').text()
                const url=$(this).find('a').attr('href')
                const time=$(this).find('span[class="posted-by"]').text()
                Articles.push({
                    title,
                    description,
                    url,
                    time,
                    source:'NDTV'
                })
            })
        })
    }

    //crickbuzz
    if(newspaper.address=='https://www.cricbuzz.com/cricket-series/'){
        axios.get(newspaper.address)
        .then(response=>{
            const html=response.data
            const $=cheerio.load(html)
            $('div[class="cb-col cb-col-100 cb-lst-itm cb-pos-rel cb-lst-itm-sm"]>div[class="cb-col cb-col-33"]',html).each(function(){
                const title=$(this).find('a').attr('title')
                const description=$(this).find('a').attr('title')
                const url=$(this).find('a').attr('href')
                const time=$(this).find('div>span[class="cb-nws-time"]').text()
                Articles.push({
                    title,
                    description,
                    url:'https://www.cricbuzz.com'+url,
                    time,
                    source:'Crickbuzz'
                })
            })
        })
    }

    //icc-cricket
    if(newspaper.address=='https://www.icc-cricket.com/'){
        axios.get(newspaper.address)
        .then(response=>{
            const html=response.data
            const $=cheerio.load(html)
            
            $('section[class="widget widget--divider "]>div[class="u-negative-wrapper"]>section[class="uniform-grid"]>div[class="col-9 col-12-desk col-12-phab uniform-grid__section"]>a',html).each(function(){
                const title=$(this).find('a>figure>figcaption>h5').text()
                const description=$(this).attr('title')
                const url=$(this).attr('href')
                Articles.push({
                    title,
                    description,
                    url:'https://www.icc-cricket.com'+url,
                    source:'icc-cricket'
                })
            })
            $('div[class="wrapper"]>div[class="col-9 col-8-desk col-12-tab has-sidebar"]>section[class="widget widget--divider "]>div[class="u-negative-wrapper"]>section[class="uniform-grid"]>div[class="col-3 col-6-desk col-12-phab uniform-grid__section"]>a',html).each(function(){
                const title=$(this).find('figure>figcaption>h5').text()
                const description=$(this).attr('title')
                const url=$(this).attr('href')
                Articles.push({
                    title,
                    description,
                    url:'https://www.icc-cricket.com'+url,
                    source:'icc-cricket'
                })
            })
        })
    }
})
//getting all articles
app.get('/', (req, res) => {
    res.json(Articles)
})

//getting cricket feeds
newspapers.forEach(cricket => {
    //crickbuzz
    if(cricket.address=='https://www.cricbuzz.com/cricket-series/'){
        axios.get(cricket.address)
        .then(response=>{
            const html=response.data
            const $=cheerio.load(html)
            $('div[class="cb-col cb-col-100 cb-lst-itm cb-pos-rel cb-lst-itm-sm"]>div[class="cb-col cb-col-33"]',html).each(function(){
                const title=$(this).find('a').attr('title')
                const description=$(this).find('a').attr('title')
                const url=$(this).find('a').attr('href')
                cricketArticles.push({
                    title,
                    description,
                    url:'https://www.cricbuzz.com'+url,
                    source:'Crickbuzz'
                })
            })
        })
    }

    //icc-cricket
    if(cricket.address=='https://www.icc-cricket.com/'){
        axios.get(cricket.address)
        .then(response=>{
            const html=response.data
            const $=cheerio.load(html)
            
            $('section[class="widget widget--divider "]>div[class="u-negative-wrapper"]>section[class="uniform-grid"]>div[class="col-9 col-12-desk col-12-phab uniform-grid__section"]>a',html).each(function(){
                const title=$(this).find('a>figure>figcaption>h5').text()
                const description=$(this).attr('title')
                const url=$(this).attr('href')
                cricketArticles.push({
                    title,
                    description,
                    url:'https://www.icc-cricket.com'+url,
                    source:'icc-cricket'
                })
            })
            $('div[class="wrapper"]>div[class="col-9 col-8-desk col-12-tab has-sidebar"]>section[class="widget widget--divider "]>div[class="u-negative-wrapper"]>section[class="uniform-grid"]>div[class="col-3 col-6-desk col-12-phab uniform-grid__section"]>a',html).each(function(){
                const title=$(this).find('figure>figcaption>h5').text()
                const description=$(this).attr('title')
                const url=$(this).attr('href')
                cricketArticles.push({
                    title,
                    description,
                    url:'https://www.icc-cricket.com'+url,
                    source:'icc-cricket'
                })
            })
        })
    }

})
app.get('/cricket', (req, res) => {
    res.json(cricketArticles)
})
//getting cricket feeds
app.get('/cricket/:id', (req, res) => {
    const id = req.params.id
    const newspaperAddress = newspapers.filter(newspaper => newspaper.name == id)[0].address
    const newspaperBase = newspapers.filter(newspaper => newspaper.name == id)[0].base
    
    if(newspaperAddress=='https://www.cricbuzz.com/cricket-series/'|| newspaperAddress=='https://www.icc-cricket.com/'){
        axios.get(newspaperAddress)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const cricketArticles = []
            //crickbuzz
            $('div[class="cb-col cb-col-100 cb-lst-itm cb-pos-rel cb-lst-itm-sm"]>div[class="cb-col cb-col-33"]',html).each(function(){
                const title=$(this).find('a').attr('title')
                const description=$(this).find('a').attr('title')
                const url=$(this).find('a').attr('href')
                cricketArticles.push({
                    title,
                    description,
                    url:'https://www.cricbuzz.com'+url,
                    source:'Crickbuzz'
                })
            })

            //icc-cricket
            $('section[class="widget widget--divider "]>div[class="u-negative-wrapper"]>section[class="uniform-grid"]>div[class="col-9 col-12-desk col-12-phab uniform-grid__section"]>a',html).each(function(){
                const title=$(this).find('a>figure>figcaption>h5').text()
                const description=$(this).attr('title')
                const url=$(this).attr('href')
                cricketArticles.push({
                    title,
                    description,
                    
                    url:'https://www.icc-cricket.com'+url,
                    source:'icc-cricket'
                })
            })
            $('div[class="wrapper"]>div[class="col-9 col-8-desk col-12-tab has-sidebar"]>section[class="widget widget--divider "]>div[class="u-negative-wrapper"]>section[class="uniform-grid"]>div[class="col-3 col-6-desk col-12-phab uniform-grid__section"]>a',html).each(function(){
                const title=$(this).find('figure>figcaption>h5').text()
                const description=$(this).attr('title')
                const url=$(this).find('a').attr('href')
                cricketArticles.push({
                    title,
                    description,
                    url:'https://www.icc-cricket.com'+url,
                    source:'icc-cricket'
                })
            })
            res.json(cricketArticles)
        }).catch(err => console.log(err))
    }
})
newspapers.forEach(news => {
    //Indian Express
    if(news.address=='https://indianexpress.com/section/india/'){
        axios.get(news.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            $('div[id="section"]>div[class="container"]>div[class="row"]>div[class="leftpanel"]>div[class="nation"]>div[class="articles first "]',html).each(function(){
                const title=$(this).find('h2').text()
                const description=$(this).find('p').text()
                const url=$(this).find('h2>a').attr('href')
                const time=$(this).find('div[class="date"]').text()
                newsArticles.push({
                    title,
                    description,
                    url,
                    time,
                    source:'Indian Express'
                })
            })
            $('div[id="section"]>div[class="container"]>div[class="row"]>div[class="leftpanel"]>div[class="nation"]>div[class="articles "]',html).each(function(){
                const title=$(this).find('h2').text()
                const description=$(this).find('p').text()
                const url=$(this).find('h2>a').attr('href')
                const time=$(this).find('div[class="date"]').text()
                newsArticles.push({
                    title,
                    description,
                    url,
                    time,
                    source:'Indian Express'
                })
            })
        })
    }

    //IndiaToday
    if(news.address=='https://www.indiatoday.in/india'){
        axios.get(news.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            $('div[class="catagory-listing"]',html).each(function(){
                const url=$(this).find('a').attr('href')
                const title=$(this).find('h2').attr('title')
                const description=$(this).find('p').text()
                const image=$(this).find('img').attr('src')
                newsArticles.push({
                    title,
                    description,
                    image,
                    url:'https://www.indiatoday.in'+url,
                    source:'India Today'
                })
            })
        })
    }

    //News 18
    if(news.address=='https://www.news18.com/india/'){
        axios.get(news.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            $('div[class="jsx-3386632719 blog_list"]>div[class="jsx-3386632719 blog_list_row"]',html).each(function(){
                const title=$(this).find('img').attr('title')
                const description=$(this).find('img').attr('title')
                const url=$(this).find('a').attr('href')
                newsArticles.push({
                    title,
                    description,
                    url,
                    source:'News 18'
                })
            })
        })
    }
    
    // Times of India
    if(news.address=='https://timesofindia.indiatimes.com/india'){
        axios.get(news.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            
            $('div[class="main-content"]>div[id="c_wdt_list_1"]>ul[class="list5 clearfix"]>li>span[class="w_tle"]',html).each(function(){
                const title=$(this).text()
                const description=$(this).text()
                const url=$(this).find('a').attr('href')
                newsArticles.push({
                    title,
                    description,
                    url:'https://timesofindia.indiatimes.com'+url,
                    source:'Times of India'
                })
            })
            $('div[class="main-content"]>div[id="c_030106"]>div[id="c_03010601"]>div[id="c_wdt_list_1"]>ul[class="list5 clearfix"]>li>span[class="w_tle"]',html).each(function(){
                const title=$(this).text()
                const description=$(this).text()
                const url=$(this).find('a').attr('href')
                newsArticles.push({
                        title,
                        description,
                        url:'https://timesofindia.indiatimes.com'+url,
                        source:'Times of India'
                    })
                })
            })
    }

    //DNA India
    if(news.address=='https://www.dnaindia.com/india'){
        axios.get(news.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            $('div[class="container main-layout"]>div[class="row"]>div[class="col-12 col-lg-6"]>div[class="list-news"]>div[class="explainer-subtext"]',html).each(function(){
                const title=$(this).find('a').text()
                const description=$(this).find('a').text()
                const url=$(this).find('a').attr('href')
                newsArticles.push({
                    title,
                    description,
                    url:'https://www.dnaindia.com/india'+url,
                    source:'DNA India'
                })
            })
            
        })
    }

    //Deccan Chronicle
    if(news.address=='https://www.deccanchronicle.com/nation'){
        axios.get(news.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            $('div[id="topStory"]>div[class="col-lg-8 col-md-8 col-sm-12 noPadding"]>div[class="col-sm-12 noPadding topStoryContainer"]>div[class="col-sm-7 noPadding"]>div[class="col-sm-12 noPadding stry-top-big-a"]',html).each(function(){
                const title=$(this).find('h2').text()
                const description=$(this).find('div[class="stry-hd-sml-cnt stry-big-cnt"]').text()
                const url=$(this).find('a').attr('href')
                newsArticles.push({
                    title,
                    description,
                    url:'https://www.deccanchronicle.com'+url,
                    source:'Deccan Chronicle'
                })
            })
            $('div[id="topStory"]>div[class="col-lg-8 col-md-8 col-sm-12 noPadding"]>div[class="col-sm-12 noPadding topStoryContainer"]>div[class="col-sm-5 tsSmall"]>div[class=" col-sm-12 col-xs-12 tstry-feed-sml-a"]',html).each(function(){
                const title=$(this).find('h3').text()
                const description=$(this).find('h3').text()
                const url=$(this).find('a').attr('href')
                newsArticles.push({
                    title,
                    description,
                    url:'https://www.deccanchronicle.com'+url,
                    source:'Deccan Chronicle'
                })
            })
            $('div[class="col-sm-12 col-xs-12 noPadding startBlock CurrentAffairsSection"]>div[class="col-sm-12 sectionHighLight noPadding"]>div[class="col-sm-12 secColorHolder"]>div[class="col-sm-3 col-xs-12 noPadding-xs"]',html).each(function(){
                const title=$(this).find('h3').text()
                const description=$(this).find('h3').text()
                const url=$(this).find('a').attr('href')
                newsArticles.push({
                    title,
                    description,
                    url:'https://www.deccanchronicle.com'+url,
                    source:'Deccan Chronicle'
                })
            })
        })

    }

    //The Hindu
    if(news.address=='https://www.thehindu.com/news/national/'){
        axios.get(news.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            $('div[class="container container-mobile"]>div[class="main"]>div[class="row"]>div[class="100_3x_1Story"]>div[class="col-xs-12"]> div[class="story1-3x100-container hover-icon"]> div[class="story1-3x100-img ElccLeadd"]',html).each(function(){
                const title=$(this).text()
                const description=$(this).text()
                const url=$(this).find('a').attr('href')
                newsArticles.push({
                    title,
                    description,
                    url,
                    source:'The Hindu'
                })
            })
            $('div[class="container container-mobile"]>div[class="main"]>div[class="row"]>div[class="50_1x_StoryCard mobile-padding"]>div[class="col-lg-6 col-md-6 col-sm-6 col-xs-12"]>div[data-paywall="false"]>div[class="story-card"]',html).each(function(){
                const title=$(this).find('h2>a').text()
                const description=$(this).find('h2>a').text()
                const url=$(this).find('h2>a').attr('href')
                newsArticles.push({
                    title,
                    description,
                    url,
                    source:'The Hindu'
                })
            })
            $('section[class="otherArticles"]>div[class="container section-container"]>div[class="main"]>div[class="row"]>div[class="50_1x_StoryCard mobile-padding storyCardParentDiv"]>div[class="col-lg-6 col-md-6 col-sm-6 col-xs-12"]>div[data-paywall="false"]>div[class="story-card"]>div[class="story-card-news"]>h3',html).each(function(){
                const title=$(this).find('a').text()
                const description=$(this).find('a').text()
                const url=$(this).find('a').attr('href')
                newsArticles.push({
                    title,
                    description,
                    url,
                    source:'The Hindu'
                })
            })
            $('section[class="otherArticles"]>div[class="container section-container"]>div[class="main"]>div[class="row"]>div[class="33_1x_OtherStoryCard mobile-padding"]>div[class="col-lg-4 col-md-4 col-sm-4 col-xs-12 hover-icon"]>div[class="Other-StoryCard"]',html).each(function(){
                const title=$(this).find('h3>a').text()
                const description=$(this).find('a').text()
                const url=$(this).find('a').attr('href')
                newsArticles.push({
                    title,
                    description,
                    url,
                    source:'The Hindu'
                })
            })
        })
    } 

    //NDTV News
    if(news.address=='https://www.ndtv.com/india#pfrom=home-ndtv_mainnavgation'){
        axios.get(news.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            $('div[class="sp-wrp"]>div[class="sp-hd"]>div[class="sp-ttl-wrp"]>div[class="sp-cn ins_storybody lstng_Pg"]>div[class="lisingNews"]>div[class="news_Itm"]',html).each(function(){
                const title=$(this).find('a').text()
                const description=$(this).find('p').text()
                const url=$(this).find('a').attr('href')
                newsArticles.push({
                    title,
                    description,
                    url,
                    source:'NDTV'
                })
            })
        })
    }

})
//getting news feeds
app.get('/news', (req, res) => {
    res.json(newsArticles)
})
//reading specified articles
app.get('/news/:id', async (req, res) => {
    const id = req.params.id
    const newspaperAddress = newspapers.filter(newspaper => newspaper.name == id)[0].address
    const newspaperBase = newspapers.filter(newspaper => newspaper.name == id)[0].base
    
    if(newspaperAddress=='https://timesofindia.indiatimes.com/india'|| newspaperAddress=='https://www.cricbuzz.com/cricket-series/' || newspaperAddress=='https://www.indiatoday.in/india'|| newspaperAddress=='https://www.ndtv.com/india#pfrom=home-ndtv_mainnavgation'|| newspaperAddress=='https://indianexpress.com/section/india/'|| newspaperAddress=='https://www.thehindu.com/news/national/'|| newspaperAddress=='https://www.news18.com/india/' || newspaperAddress=='https://www.deccanchronicle.com/nation'|| newspaperAddress=='https://www.dnaindia.com/india'){
    axios.get(newspaperAddress)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const specificArticles = []
            
            

            //Indian Express
            $('div[id="section"]>div[class="container"]>div[class="row"]>div[class="leftpanel"]>div[class="nation"]>div[class="articles first "]',html).each(function(){
                const title=$(this).find('h2').text()
                const description=$(this).find('p').text()
                const url=$(this).find('h2>a').attr('href')
                const time=$(this).find('div[class="date"]').text()
                specificArticles.push({
                    title,
                    description,
                    url,
                    time,
                    source:'Indian Express'
                })
            })
            $('div[id="section"]>div[class="container"]>div[class="row"]>div[class="leftpanel"]>div[class="nation"]>div[class="articles "]',html).each(function(){
                const title=$(this).find('h2').text()
                const description=$(this).find('p').text()
                const url=$(this).find('h2>a').attr('href')
                const time=$(this).find('div[class="date"]').text()
                specificArticles.push({
                    title,
                    description,
                    url,
                    time,
                    source:'Indian Express'
                })
            })

            //India Today
            $('div[class="catagory-listing"]',html).each(function(){
                const url=$(this).find('a').attr('href')
                const title=$(this).find('h2').attr('title')
                const description=$(this).find('p').text()
                const image=$(this).find('img').attr('src')
                specificArticles.push({
                    title,
                    description,
                    image,
                    url:'https://www.indiatoday.in/'+url,
                    source:'India Today'
                })
            })

            //News 18
            $('div[class="jsx-3386632719 blog_list"]>div[class="jsx-3386632719 blog_list_row"]',html).each(function(){
                const title=$(this).find('img').attr('title')
                const description=$(this).find('img').attr('title')
                const url=$(this).find('a').attr('href')
                specificArticles.push({
                    title,
                    description,
                    url,
                    source:'News 18'
                })
            })
            
            //NDTV News
            $('div[class="sp-wrp"]>div[class="sp-hd"]>div[class="sp-ttl-wrp"]>div[class="sp-cn ins_storybody lstng_Pg"]>div[class="lisingNews"]>div[class="news_Itm"]',html).each(function(){
                const title=$(this).find('a').text()
                const description=$(this).find('p').text()
                const url=$(this).find('a').attr('href')
                const time=$(this).find('span[class="posted-by"]').text()
                specificArticles.push({
                    title,
                    description,
                    url,
                    time,
                    source:'NDTV'
                })
            })

            //Times of India
            $('div[class="main-content"]>div[id="c_wdt_list_1"]>ul[class="list5 clearfix"]>li>span[class="w_tle"]',html).each(function(){
                const title=$(this).text()
                const description=$(this).text()
                const url=$(this).find('a').attr('href')
                specificArticles.push({
                    title,
                    description,
                    url:'https://timesofindia.indiatimes.com/'+url,
                    source:'Times of India'
                })
            })
            $('div[class="main-content"]>div[id="c_030106"]>div[id="c_03010601"]>div[id="c_wdt_list_1"]>ul[class="list5 clearfix"]>li>span[class="w_tle"]',html).each(function(){
                const title=$(this).text()
                const description=$(this).text()
                const url=$(this).find('a').attr('href')
                specificArticles.push({
                    title,
                    description,
                    url:'https://timesofindia.indiatimes.com/'+url,
                    source:'Times of India'
                })
            })

            //DNA India
            $('div[class="container main-layout"]>div[class="row"]>div[class="col-12 col-lg-6"]>div[class="list-news"]>div[class="explainer-subtext"]',html).each(function(){
                const title=$(this).find('a').text()
                const description=$(this).find('a').text()
                const url=$(this).find('a').attr('href')
                specificArticles.push({
                    title,
                    description,
                    url:'https://www.dnaindia.com/'+url,
                    source:'DNA India'
                })
            })

            //Deccan Chronicle
            $('div[id="topStory"]>div[class="col-lg-8 col-md-8 col-sm-12 noPadding"]>div[class="col-sm-12 noPadding topStoryContainer"]>div[class="col-sm-7 noPadding"]>div[class="col-sm-12 noPadding stry-top-big-a"]',html).each(function(){
                const title=$(this).find('h2').text()
                const description=$(this).find('div[class="stry-hd-sml-cnt stry-big-cnt"]').text()
                const url=$(this).find('a').attr('href')
                specificArticles.push({
                    title,
                    description,
                    url:'https://www.deccanchronicle.com'+url,
                    source:'Deccan Chronicle'
                })
            })
            $('div[id="topStory"]>div[class="col-lg-8 col-md-8 col-sm-12 noPadding"]>div[class="col-sm-12 noPadding topStoryContainer"]>div[class="col-sm-5 tsSmall"]>div[class=" col-sm-12 col-xs-12 tstry-feed-sml-a"]',html).each(function(){
                const title=$(this).find('h3').text()
                const description=$(this).find('h3').text()
                const url=$(this).find('a').attr('href')
                specificArticles.push({
                    title,
                    description,
                    url:'https://www.deccanchronicle.com'+url,
                    source:'Deccan Chronicle'
                })
            })
            $('div[class="col-sm-12 col-xs-12 noPadding startBlock CurrentAffairsSection"]>div[class="col-sm-12 sectionHighLight noPadding"]>div[class="col-sm-12 secColorHolder"]>div[class="col-sm-3 col-xs-12 noPadding-xs"]',html).each(function(){
                const title=$(this).find('h3').text()
                const description=$(this).find('h3').text()
                const url=$(this).find('a').attr('href')
                specificArticles.push({
                    title,
                    description,
                    url:'https://www.deccanchronicle.com'+url,
                    source:'Deccan Chronicle'
                })
            })

            //The Hindu
            $('div[class="container container-mobile"]>div[class="main"]>div[class="row"]>div[class="100_3x_1Story"]>div[class="col-xs-12"]> div[class="story1-3x100-container hover-icon"]> div[class="story1-3x100-img ElccLeadd"]',html).each(function(){
                const title=$(this).text()
                const description=$(this).text()
                const url=$(this).find('a').attr('href')
                specificArticles.push({
                    title,
                    description,
                    url,
                    source:'The Hindu'
                })
            })
            $('div[class="container container-mobile"]>div[class="main"]>div[class="row"]>div[class="50_1x_StoryCard mobile-padding"]>div[class="col-lg-6 col-md-6 col-sm-6 col-xs-12"]>div[data-paywall="false"]>div[class="story-card"]',html).each(function(){
                const title=$(this).find('h2>a').text()
                const description=$(this).find('h2>a').text()
                const url=$(this).find('h2>a').attr('href')
                specificArticles.push({
                    title,
                    description,
                    url,
                    source:'The Hindu'
                })
            })
            $('section[class="otherArticles"]>div[class="container section-container"]>div[class="main"]>div[class="row"]>div[class="50_1x_StoryCard mobile-padding storyCardParentDiv"]>div[class="col-lg-6 col-md-6 col-sm-6 col-xs-12"]>div[data-paywall="false"]>div[class="story-card"]>div[class="story-card-news"]>h3',html).each(function(){
                const title=$(this).find('a').text()
                const description=$(this).find('a').text()
                const url=$(this).find('a').attr('href')
                specificArticles.push({
                    title,
                    description,
                    url,
                    source:'The Hindu'
                })
            })
            $('section[class="otherArticles"]>div[class="container section-container"]>div[class="main"]>div[class="row"]>div[class="33_1x_OtherStoryCard mobile-padding"]>div[class="col-lg-4 col-md-4 col-sm-4 col-xs-12 hover-icon"]>div[class="Other-StoryCard"]',html).each(function(){
                const title=$(this).find('h3>a').text()
                const description=$(this).find('a').text()
                const url=$(this).find('a').attr('href')
                specificArticles.push({
                    title,
                    description,
                    url,
                    source:'The Hindu'
                })
            })

            
            res.json(specificArticles)
        }).catch(err => console.log(err))
    }
})

app.listen(PORT, () => console.log(`server running on ${PORT}`))