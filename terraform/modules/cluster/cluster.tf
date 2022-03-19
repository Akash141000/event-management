resource "azurerm_resource_group" "event_management_group" {
    name = "event_management_group"
    location = var.location
}



resource "azurerm_container_registry" "event_management_registry" {
    name = "eventmanagementregistry"
    resource_group_name = azurerm_resource_group.event_management_group.name
    location = azurerm_resource_group.event_management_group.location
    sku = "Standard"
    admin_enabled = false
}


resource "azurerm_kubernetes_cluster" "event_management_cluster" {
    name = "eventmanagementcluster"
    location = azurerm_resource_group.event_management_group.location
    resource_group_name = azurerm_resource_group.event_management_group.name
    dns_prefix = "event-management-azure"

    service_principal {
      client_id = var.serviceprinciple_id
      client_secret = var.serviceprinciple_key
    }

    default_node_pool {
      name = "default"
      node_count = 1
      vm_size = "Standard_E4s_v3"
      type = "VirtualMachineScaleSets"

    }

    linux_profile {
      admin_username = "azureuser"
      ssh_key {
        key_data = var.ssh_key
      }
    }

    network_profile {
      network_plugin = "kubenet"
      load_balancer_sku = "Standard"
    }

    addon_profile {
        aci_connector_linux {
          enabled = false
        }

        azure_policy {
          enabled = false
        }

        http_application_routing {
          enabled = false
        }

        kube_dashboard {
          enabled = false
        }

        oms_agent {
          enabled = false
        }

    }
   

}