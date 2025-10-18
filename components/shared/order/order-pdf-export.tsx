'use client'

import { Button } from '@/components/ui/button'
import { Order, OrderItem } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { FileText } from 'lucide-react'
import { pdf } from '@react-pdf/renderer'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

interface OrderPDFExportProps {
  order: Order
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    fontSize: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    padding: 8,
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    fontSize: 9,
  },
  tableCell: {
    flex: 1,
    paddingRight: 5,
  },
  tableCellId: {
    flex: 0.8,
    paddingRight: 5,
  },
  tableCellQty: {
    flex: 0.5,
    paddingRight: 5,
    textAlign: 'center',
  },
  tableCellPrice: {
    flex: 0.8,
    paddingRight: 5,
    textAlign: 'right',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8,
    color: '#666666',
  },
  statusBadge: {
    padding: 4,
    borderRadius: 4,
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  paidStatus: {
    backgroundColor: '#D4EDDA',
    color: '#155724',
  },
  unpaidStatus: {
    backgroundColor: '#F8D7DA',
    color: '#721C24',
  },
  deliveredStatus: {
    backgroundColor: '#D1ECF1',
    color: '#0C5460',
  },
})

// PDF Document Component
const OrderPDFDocument = ({ order }: OrderPDFExportProps) => {
  const now = new Date()
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Order Receipt</Text>
        <Text style={styles.subtitle}>
          Order ID: {order.id.substring(0, 8)}...
        </Text>
        <Text style={styles.subtitle}>
          Generated on: {now.toLocaleDateString('vi-VN')} at {now.toLocaleTimeString('vi-VN')}
        </Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Information</Text>
          <View style={styles.summaryRow}>
            <Text>Order ID:</Text>
            <Text>{order.id}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Customer:</Text>
            <Text>{order.user?.name || 'N/A'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Email:</Text>
            <Text>{order.user?.email || 'N/A'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Order Date:</Text>
            <Text>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Payment Method:</Text>
            <Text>{order.paymentMethod}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Status:</Text>
            <Text>{order.isPaid ? 'Paid' : 'Unpaid'}</Text>
          </View>
          {order.isDelivered && (
            <View style={styles.summaryRow}>
              <Text>Delivery Date:</Text>
              <Text>{order.deliveredAt ? new Date(order.deliveredAt).toLocaleDateString('vi-VN') : 'N/A'}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
          <View style={styles.summaryRow}>
            <Text>Name:</Text>
            <Text>{order.shippingAddress.fullName}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Address:</Text>
            <Text>{order.shippingAddress.streetAddress}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>City:</Text>
            <Text>{order.shippingAddress.city}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Postal Code:</Text>
            <Text>{order.shippingAddress.postalCode}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Country:</Text>
            <Text>{order.shippingAddress.country}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text>Items Price:</Text>
            <Text>{formatCurrency(Number(order.itemsPrice))}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Shipping Price:</Text>
            <Text>{formatCurrency(Number(order.shippingPrice))}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Tax Price:</Text>
            <Text>{formatCurrency(Number(order.taxPrice))}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Total Price:</Text>
            <Text>{formatCurrency(Number(order.totalPrice))}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableCellId}>Product ID</Text>
              <Text style={styles.tableCell}>Product Name</Text>
              <Text style={styles.tableCellQty}>Qty</Text>
              <Text style={styles.tableCellPrice}>Price</Text>
            </View>
            {order.orderItems?.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCellId}>{item.productId.substring(0, 8)}...</Text>
                <Text style={styles.tableCell}>{item.name}</Text>
                <Text style={styles.tableCellQty}>{item.qty}</Text>
                <Text style={styles.tableCellPrice}>{formatCurrency(item.price)}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.summaryRow}>
            Total Items: {order.orderItems?.reduce((sum, item) => sum + item.qty, 0) || 0}
          </Text>
          <Text style={styles.summaryRow}>
            Total Products: {order.orderItems?.length || 0}
          </Text>
        </View>
        
        <View style={styles.footer}>
          <Text>Generated by HQ Home E-commerce</Text>
          <Text>Page 1 of 1</Text>
        </View>
      </Page>
    </Document>
  )
}

export default function OrderPDFExport({ order }: OrderPDFExportProps) {
  const generatePDF = async () => {
    try {
      const blob = await pdf(
        <OrderPDFDocument order={order} />
      ).toBlob()
      
      const pdfUrl = URL.createObjectURL(blob)
      window.open(pdfUrl, '_blank')
      
      // Clean up the URL after a delay
      setTimeout(() => {
        URL.revokeObjectURL(pdfUrl)
      }, 1000)
    } catch (error) {
      console.error('Error generating PDF:', error)
    }
  }

  return (
    <Button
      onClick={generatePDF}
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
    >
      <FileText className="h-4 w-4" />
      Download PDF
    </Button>
  )
}
