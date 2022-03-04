package com.example.accessingdatapostgres;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


//HTMLページ情報格納用クラス
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer"}) 
public class Doc{
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	//@GeneratedValue
	private Long id;
	
	private String docName;

	private String note;
	
	//@OneToMany(mappedBy="doc", cascade=CascadeType.ALL)
    //private List<HtmlElement> htmlElements;
	
	public Long getId() {
		return this.id;
	}
	public void setId(Long id) {
		this.id = id;	
	}

	public String getDocName() {
		return this.docName;		
	}
	public void setDocName(String docName) {
		this.docName = docName;
	}
		
	public String getNote() {
		return this.note;		
	}
	public void setNote(String note) {
		this.note = note;
	}
		
	/* @OneToManyを使用しない場合はコメントアウト	
	public List<HtmlElement> getHtmlElements() {
        return htmlElements;
    }

    public void setHtmlElements(List<HtmlElement> htmlElements) {
        this.htmlElements = htmlElements;
    }
	*/

}
