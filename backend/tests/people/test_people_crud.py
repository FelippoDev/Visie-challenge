from fastapi import status
from pytest import mark

@mark.people_crud
class TestPersonCrud:
    @mark.parametrize("description",
            ["Tests person's creation, expects code 201"])
    def test_create_person(
            self, mocked_person, api_client, description, db):
        url = '/api/v1/people'
        breakpoint()
        response = api_client.post(url, json=mocked_person)
        assert response.status_code == status.HTTP_201_CREATED
        assert response.json() == mocked_person

    @mark.parametrize("description",
            ["Tests get people route, expects code 200 and people list"])
    def test_get_people(self, mocked_person, api_client, description, db):
        url = '/api/v1/people'
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == [mocked_person]
        
    @mark.parametrize("description",
            ["Tests get person route, expects code 200 and person object"])
    def test_get_person(self, mocked_person_model, api_client, description):
        url = f'/api/v1/people/{mocked_person_model.id_pessoa}'
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == mocked_person_model
        
    @mark.parametrize("description",
            ["Tests update person route, expects code 200 and person object"])
    def test_update_person(self, mocked_person_model, 
            api_client, update_mocked_person, description):
        url = f'/api/v1/people/{mocked_person_model.id_pessoa}'
        response = api_client.get(url, json=update_mocked_person)
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == update_mocked_person
        
    @mark.parametrize("description",
            ["Tests delete person route, expects code 204"])
    def test_delete_person(self, mocked_person_model, api_client, description):
        url = f'/api/v1/people/{mocked_person_model.id_pessoa}'
        response = api_client.get(url)
        assert response.status_code == status.HTTP_204_NO_CONTENT

    @mark.parametrize("description",
            ["Tests update person route error, expects code 404"])
    def test_update_person_not_found(self, api_client, 
            update_mocked_person, description):
        url = f'/api/v1/people/9999'
        response = api_client.get(url, json=update_mocked_person)
        assert response.status_code == status.HTTP_404_NOT_FOUND
        assert response.json() == {"detail": "Person not found"}
        
    @mark.parametrize("description",
            ["Tests delete person route error, expects code 404"])
    def test_delete_person_not_found(self, api_client, description):
        url = f'/api/v1/people/99'
        response = api_client.get(url)
        assert response.status_code == status.HTTP_404_NOT_FOUND
        assert response.json() == {"detail": "Person not found"}
        
    @mark.parametrize("description",
            ["Tests create person route error, expects code 400"])
    def test_create_person_already_registered(
        self, api_client, mocked_person_model, description):
        url = '/api/v1/people'
        response = api_client.post(url, json=mocked_person_model)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert response.json() == {"detail": "Person already registered"}
