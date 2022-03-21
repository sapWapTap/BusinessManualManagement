package com.example.accessingdatapostgres;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;



//HTMLページ情報格納用クラス
@Entity
public class HtmlElement{
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	
	private String tagName;
	
	private String idName;

	private String className;
	
	private String text;
	
	private Double clientRectTop;
	
	private Integer chapterLevel;
	
	//@ManyToOneを使う場合はコメントする
	private Long docId;
	
	private String color;
	
	private Boolean delFlag;
	
	//@ManyToOne
    //@JoinColumn(name="doc_id")
    //private Doc doc;

	public Long getId() {
		return this.id;
	}
	public void setId(Long id) {
		this.id = id;	
	}

	public String getTagName() {
		return this.tagName;		
	}
	public void setTagName(String tagName) {
		this.tagName = tagName;
	}
	
	public String getIdName() {
		return this.idName;		
	}
	public void setIdName(String idName) {
		this.idName = idName;
	}
	
	public String getClassName() {
		return this.className;		
	}
	public void setClassName(String className) {
		this.className = className;
	}
	
	public String getText() {
		return this.text;		
	}
	public void setText(String text) {
		this.text = text;
	}
		
	public Double getClientRectTop() {
		return this.clientRectTop;		
	}
	public void setClientRectTop(Double clientRectTop) {
		this.clientRectTop = clientRectTop;
	}
		
	public Integer getChapterLevel() {
		return this.chapterLevel;		
	}
	public void setChapterLevel(Integer chapterLevel) {
		this.chapterLevel = chapterLevel;
	}
		
	public String getColor() {
		return this.color;		
	}
	public void setColor(String color) {
		this.color = color;
	}
	/* @ManyToOneを使用する場合はコメントする
	*/
	public Long getDocId() {
		return this.docId;		
	}
	public void setDocId(Long docId) {
		this.docId = docId;
	}

	/* @ManyToOneを使用しない場合はコメントする
	public Doc getDoc() {
        return doc;
    }

    public void setDoc(Doc doc) {
        this.doc = doc;
    }
	*/

	public Boolean getDelFlag() {
		return this.delFlag;		
	}
	public void setDelFlag(Boolean delFlag) {
		this.delFlag = delFlag;
	}
	
	
	@Override
	public int hashCode() {
		return Objects.hash(chapterLevel, className, clientRectTop, color, delFlag, docId, id, idName, tagName, text);
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		HtmlElement other = (HtmlElement) obj;
		return Objects.equals(chapterLevel, other.chapterLevel) && Objects.equals(className, other.className)
				&& Objects.equals(clientRectTop, other.clientRectTop) && Objects.equals(color, other.color)
				&& Objects.equals(delFlag, other.delFlag) && Objects.equals(docId, other.docId)
				&& Objects.equals(id, other.id) && Objects.equals(idName, other.idName)
				&& Objects.equals(tagName, other.tagName) && Objects.equals(text, other.text);
	}
	
	//コンストラクタ
	public HtmlElement(
			Long id,
			String tagName,
			String idName,
			String className,
			String text,
			Double clientRectTop,
			Integer chapterLevel,
			String color,
			Long docId,
			Boolean delFlag
	)
	{
			this.setId(id);
			this.setTagName(tagName);
			this.setIdName(idName);
			this.setClassName(className);
			this.setText(text);
			this.setClientRectTop(clientRectTop);
			this.setChapterLevel(chapterLevel);
			this.setColor(color);
			this.setDocId(docId);
			this.setDelFlag(delFlag);
	}	

	public HtmlElement() {
		super();
	}

	
}
