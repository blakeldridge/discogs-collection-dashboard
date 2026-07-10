package main

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"net/url"

	"encoding/json"

	"os"
)

// STRUCTURES

type CollectionValue struct {
	Maximum string `json:"maximum"`
	Median string `json:"median"`
	Minimum string `json:"minimum"`
}

type CollectionFolder struct {
	ID          int    `json:"id"`
	Count       int    `json:"count"`
	Name        string `json:"name"`
	ResourceURL string `json:"resource_url"`
}

type CollectionItem struct {
	ID               int              `json:"id"`
	InstanceID       int              `json:"instance_id"`
	FolderID         int              `json:"folder_id"`
	Rating           int              `json:"rating"`
	BasicInformation BasicInfo        `json:"basic_information"`
	Notes            []CollectionNote `json:"notes"`
}

type WantlistItem struct {
	Rating           int              `json:"rating"`
	BasicInformation BasicInfo        `json:"basic_information"`
	ID               int              `json:"id"`
	ResourceURL       int             `json:"resrouce_url"`
}

type BasicInfo struct {
	ID         int            `json:"id"`
	Title      string         `json:"title"`
	Year       int            `json:"year"`
	ResourceURL string         `json:"resource_url"`
	Thumb      string         `json:"thumb"`
	CoverImage string         `json:"cover_image"`
	Formats    []FormatItem   `json:"formats"`
	Labels     []LabelItem    `json:"labels"`
	Artists    []ArtistItem   `json:"artists"`
	Genres     []string       `json:"genres"` // Array of strings
	Styles     []string       `json:"styles"` // Array of strings
}

type FormatItem struct {
	Qty          string   `json:"qty"`
	Descriptions []string `json:"descriptions"` // Array of strings
	Name         string   `json:"name"`
}

type LabelItem struct {
	ResourceURL string `json:"resource_url"`
	EntityType  string `json:"entity_type"`
	CatNo       string `json:"catno"`
	ID          int    `json:"id"`
	Name        string `json:"name"`
}

type ArtistItem struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Join        string `json:"join"`
	ResourceURL string `json:"resource_url"`
	Anv         string `json:"anv"`
	Tracks      string `json:"tracks"`
	Role        string `json:"role"`
}

type CollectionNote struct {
	FieldID int    `json:"field_id"`
	Value   string `json:"value"`
}

type SearchResult struct {
	ID          int               `json:"id"`
	Type        string            `json:"type"`
	Title       string            `json:"title"`
	Year        string            `json:"year"`
	Country     string            `json:"country"`
	Thumb       string            `json:"thumb"`
	URI         string            `json:"uri"`
	ResourceURL string            `json:"resource_url"`
	Catno       string            `json:"catno"`
	Genre       []string          `json:"genre"`
	Style       []string          `json:"style"`
	Format      []string          `json:"format"`
	Label       []string          `json:"label"`
	Community   CommunityStats    `json:"community"`
}

type CommunityStats struct {
	Want int `json:"want"`
	Have int `json:"have"`
}

// RESPONSES
type CollectionResponse struct {
	Releases []CollectionItem `json:"releases"`
}

type WantlistResponse struct {
	Wants []WantlistItem `json:"wants"`
}

type SearchResponse struct {
	Results []SearchResult `json:"results"`
}

type AddToCollectionResponse struct {
	InstanceID  int    `json:"instance_id"`
	ResourceURL string `json:"resource_url"`
}

type AddToWantlistResponse struct {
	ID int `json:"id"`
	Rating int `json:"rating"`
	Notes string `json:"notes"`
	ResourceURL string `json:"resource_url"`
	BasicInformation BasicInfo `json:"basic_information"`
}

// Parameter Structures
type SearchParams struct {
	Query string `json:"query"`
	Artist string `json:"artist"`
	ReleaseTitle string `json:"release_title"`
	Format string `json:"format"`
	Year string `json:"year"`
}


// App struct
type App struct {
	ctx context.Context
	username string
	apiKey string
}


// NewApp creates a new App application struct
func NewApp() *App {
	return &App{
		username: os.Getenv("DISCOGS_USERNAME"),
		apiKey: os.Getenv("DISCOGS_APIKEY"),
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// CUSTOM CALLS

func (a *App) GetCollectionValue() string {
	url := fmt.Sprintf("https://api.discogs.com/users/%s/collection/value?token=%s", a.username, a.apiKey)


	client := &http.Client{}
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return "Error : Unable to connect to API"
	}	
	req.Header.Set("User-Agent", "MyDashboardApp/1.0")

	resp, err := client.Do(req)
    if err != nil {
        return "Error: Unable to connect to API"
    }   
    defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "Error : Unable to read response"
	}

	var data CollectionValue
	err = json.Unmarshal(body, &data)
	if err != nil {
		return "Error: Unable to parse JSON data"
	}

	return fmt.Sprintf("Min: %s | Med: %s | Max: %s", data.Minimum, data.Median, data.Maximum)
}

func (a *App) GetCollection() []CollectionItem {
	url := fmt.Sprintf("https://api.discogs.com/users/%s/collection/folders/1/releases?token=%s", a.username, a.apiKey)


	client := &http.Client{}
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return []CollectionItem{}
	}	
	req.Header.Set("User-Agent", "MyDashboardApp/1.0")

	resp, err := client.Do(req)
    if err != nil {
        return []CollectionItem{}
    }   
    defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return []CollectionItem{}
	}

	var data CollectionResponse
	err = json.Unmarshal(body, &data)
	if err != nil {
		fmt.Println("Error: Unable to parse JSON data:", err)
		return []CollectionItem{}
	}

	return data.Releases
}

func (a *App) GetWantlist() []WantlistItem {
	url := fmt.Sprintf("https://api.discogs.com/users/%s/wants?token=%s", a.username, a.apiKey)


	client := &http.Client{}
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return []WantlistItem{}
	}	
	req.Header.Set("User-Agent", "MyDashboardApp/1.0")

	resp, err := client.Do(req)
    if err != nil {
        return []WantlistItem{}
    }   
    defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return []WantlistItem{}
	}

	var data WantlistResponse
	err = json.Unmarshal(body, &data)
	if err != nil {
		fmt.Println("Error: Unable to parse JSON data:", err)
		return []WantlistItem{}
	}

	return data.Wants
}

func (a *App) Search(params SearchParams) []SearchResult {
	queryParams := url.Values{}
	queryParams.Set("token", a.apiKey)

	if params.Query != "" {
		queryParams.Set("q", params.Query)
	}
	if params.Artist != "" {
		queryParams.Set("artist", params.Artist)
	}
	if params.ReleaseTitle != "" {
		queryParams.Set("release_title", params.ReleaseTitle)
	}
	if params.Format != "" {
		queryParams.Set("format", params.Format)
	}
	if params.Year != "" {
		queryParams.Set("year", params.Year)
	}

	url := fmt.Sprintf("https://api.discogs.com/database/search?%s", queryParams.Encode())

	fmt.Println(url)

	client := &http.Client{}
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return []SearchResult{}
	}	
	req.Header.Set("User-Agent", "MyDashboardApp/1.0")

	resp, err := client.Do(req)
    if err != nil {
        return []SearchResult{}
    }   
    defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return []SearchResult{}
	}

	var data SearchResponse
	err = json.Unmarshal(body, &data)
	if err != nil {
		fmt.Println("Error: Unable to parse JSON data:", err)
		return []SearchResult{}
	}

	return data.Results
}

func (a *App) AddToCollection(release_id int) (*AddToCollectionResponse, error) {
	url := fmt.Sprintf("https://api.discogs.com/users/%s/collection/folders/1/releases/%d?token=%s", a.username, release_id, a.apiKey)

	fmt.Println(url)


	client := &http.Client{}
	req, err := http.NewRequest("POST", url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}	
	req.Header.Set("User-Agent", "MyDashboardApp/1.0")

	resp, err := client.Do(req)
    if err != nil {
        return nil, fmt.Errorf("failed to create request: %w", err)
    }   
    defer resp.Body.Close()

	if resp.StatusCode != http.StatusCreated {
		return nil, fmt.Errorf("discogs returned error status: %s", resp.Status)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	var successData AddToCollectionResponse
	err = json.Unmarshal(body, &successData)
	if err != nil {
		fmt.Println("Error: Unable to parse JSON data:", err)
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	return &successData, nil
}


func (a *App) AddToWantlist(release_id int) (*AddToWantlistResponse, error) {
	url := fmt.Sprintf("https://api.discogs.com/users/%s/wants/%d?token=%s", a.username, release_id, a.apiKey)

	fmt.Println(url)


	client := &http.Client{}
	req, err := http.NewRequest("PUT", url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}	
	req.Header.Set("User-Agent", "MyDashboardApp/1.0")

	resp, err := client.Do(req)
    if err != nil {
        return nil, fmt.Errorf("failed to create request: %w", err)
    }   
    defer resp.Body.Close()

	if resp.StatusCode != http.StatusCreated {
		return nil, fmt.Errorf("discogs returned error status: %s", resp.Status)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	var successData AddToWantlistResponse
	err = json.Unmarshal(body, &successData)
	if err != nil {
		fmt.Println("Error: Unable to parse JSON data:", err)
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	return &successData, nil
}