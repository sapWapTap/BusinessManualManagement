package com.example.accessingdatapostgres;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

import org.hibernate.annotations.Type;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter@Setter @NoArgsConstructor
public class FileDB {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String type;

	@Lob // ポイント2: @Lobと@Typeを以下のようにつける(@Lobはサイズが大きいデータのカラムにつけるみたい。@Typeがないと「bigintのデータが出力されてますよ」的なエラーが出る
	@Type(type = "org.hibernate.type.BinaryType")
	@Column(name = "data")
	private byte[] data;

	public FileDB(String name, String type, byte[] data) {
		this.name = name;
		this.type = type;
		this.data = data;
	}

}


