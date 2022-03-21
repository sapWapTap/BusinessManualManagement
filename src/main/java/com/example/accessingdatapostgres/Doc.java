package com.example.accessingdatapostgres;

import java.util.Objects;

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

	
	
	
	//コンストラクタ
	public Doc(Long id, String docName, String note) {
		this.id = id;
		this.docName = docName;
		this.note = note;
	}
	public Doc() {
		super();
	}
	@Override
	public int hashCode() {
		return Objects.hash(docName, id, note);
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Doc other = (Doc) obj;
		return Objects.equals(docName, other.docName) && Objects.equals(id, other.id)
				&& Objects.equals(note, other.note);
	}

	@Override
	public String toString() {
		return "Doc [id=" + id + ", docName=" + docName + ", note=" + note + "]";
	}



}
