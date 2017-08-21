#coding=utf-8
import urllib.request

def getHtml(url):
    page = urllib.request.urlopen(url).read()
    #html = page.read()
    return page

html = getHtml("https://www.baidu.com/")

print (html)