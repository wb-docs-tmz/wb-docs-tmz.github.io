---
layout: page
title: Feeds
---


###### TMZ provides the following types of feeds:

+ __atom__ - http://en.wikipedia.org/wiki/Atom_(standard)
+ __dfp__ - https://support.google.com/dfp_premium/answer/2476004?hl=en&ref_topic=2475994&rd=1
+ __rss__ - http://en.wikipedia.org/wiki/RSS
+ __mrss__ - http://en.wikipedia.org/wiki/Media_RSS

*Unless otherwise noted, if the URI pattern contains `{feed_type}` then any of the above types will work.*


###### Content Types:

+ __videos__ - May include TMZ Kaltura videos, YouTube videos or playlists and Vine videos.

*Unless otherwise noted, if the URI pattern contains `{content_type}` then any of the above types will work.*


###### Paging:

Feeds that support pagination will have an `atom:link` with the next link to follow, e.g.
`<link rel="next" type="application/atom+xml" href="{next_link}"/>`



***



## Available Feeds


###### Latest News
This is the TMZ home page feed.

+ `https://feeds.tmz.com/latest-news/{feed_type}`


###### Filtered by Hashtag
+ `https://feeds.tmz.com/tags/{hashtag}/{feed_type}`
+ `https://feeds.tmz.com/tags/{hashtag}/{content_type}/{feed_type}`


###### Filtered by List
+ `https://feeds.tmz.com/lists/{list}/{feed_type}`
+ `https://feeds.tmz.com/lists/{list}/{content_type}/{feed_type}`


###### Iris
Custom feed for Iris partner that delivers an MRSS feed of kaltura videos. The category is a valid irs category (e.g. _i_ad-sales-amazon_i_)

+ `https://feeds.tmz.com/iris/{kaltura_cat}` - Provides the "home featured" content.

###### Video
Custom feed that delivers TMZ videos.  

+ `https://feeds.tmz.com/latest-news/` - Provides the "home featured" content.


##### AOL Publishers JSON News Format
Custom feed for AOL for showing homepage news in JSON format. Takes special parameters.
+ __start__ - required- a unix Timestamp.
+ __end__ - optional- a unix timestamp. Defaults to current timestamp.
+ __n__ - optional- Limits the number of items returned. Defaults to 100.
`https://dev-feeds.tmzdev.com/latest-news-by-range/aoljson?start={start_date}&end={end_date}&n={max}`

***



## ETags

All feeds will return an ETag that can be used to conditionally fetch a feed.  For example,
passing a header `If-None-Match: ETAG` will return a 304 status code if the content has not
been modified.  See [HTTP ETag](http://en.wikipedia.org/wiki/HTTP_ETag).

__CURL Example:__
{% highlight bash %}
# Get the ETag for the feed
etag=$(curl -s -I "https://feeds.tmz.com/lastest-news/rss" 2>|/dev/null | awk '/^ETag: / {print $2}' | sed 's/\"//g')
etag=`echo -n "${etag//[[:space:]]/}"`

# Verify the ETag, should return "HTTP/1.0 304 Not Modified"
eval "curl -s -I -H 'If-None-Match: \"$etag\"' \"https://feeds.tmz.com/rss\""


{% endhighlight %}
