#coding=utf-8
import urllib.request

def getHtml(url):
    page = urllib.request.urlopen(url).read()
    #html = page.read()
	#12313
    return page

html = getHtml("https://www.baidu.com/")

print (html)