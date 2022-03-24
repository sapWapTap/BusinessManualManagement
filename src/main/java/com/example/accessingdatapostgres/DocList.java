package com.example.accessingdatapostgres;

import java.io.Serializable;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DocList implements Serializable {

	private List<Doc> DocList;
	
}
